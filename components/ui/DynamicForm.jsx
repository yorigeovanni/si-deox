import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { useState, useEffect, useCallback, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import createRequest from "@/services/api-secure-internal";
import { z } from "zod";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { CharInput } from "./inputs/CharInput";
import { NumberInput } from "./inputs/NumberInput";
import { TextAreaInput } from "./inputs/TextAreaInput";
import { PhoneInput } from "./inputs/PhoneInput";
import { EmailInput } from "./inputs/EmailInput";
import { ManyToOneInput } from "./inputs/ManyToOneInput";
import { TagsInput } from "./inputs/TagsInput";
import { LinesInput } from "./inputs/LinesInput";
import { MapSinglePointInput } from "./inputs/MapSinglePointInput";
import { DateInput } from "./inputs/DateInput";



dayjs.extend(utc);

export const DynamicForm = ({
  basecolor,
  fields,
  onSubmit,
  onBack,
  id,
  model,
  initialValues,
}) => {
  const { post } = createRequest();
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(!!id);
  const [formReady, setFormReady] = useState(false);
  const totalSteps = fields.length;
  const showProgress = totalSteps > 1;

  const generateSchema = () => {
    const schemaFields = fields.flat().reduce((acc, field) => {
      let fieldSchema = z.string();
      if (field.rules?.required) {
        fieldSchema = fieldSchema.min(1, field.rules.required);
      }
      if (field.type === "email") {
        fieldSchema = z.string().email("Invalid email format");
      }
      if (field.type === "number") {
        fieldSchema = z
          .string()
          .refine((val) => !isNaN(val), "Must be a number")
          .transform(Number);
      }
      if (field.type === "phoneNumber") {
        fieldSchema = z
          .string()
          .min(10, "Phone number must be at least 10 digits")
          .regex(/^[0-9+\-\s()]*$/, "Invalid phone number format");
      }
      if (field.type === "manyToOne") {
        fieldSchema = z
          .object({
            id: z.number(),
            [field.optionLabel || "name"]: z.string(),
          })
          .nullable();
      }
      if (field.type === "tags") {
        fieldSchema = z.any().default([]);
      }
      if (field.type === "lines") {
        fieldSchema = z.array(z.any()).default([]);
      }
      return {
        ...acc,
        [field.name]: fieldSchema,
      };
    }, {});

    return z.object(schemaFields);
  };
  const formSchema = generateSchema();

  const {
    control,
    handleSubmit,
    formState: { errors },
    trigger,
    reset,
    setValue,
    getValues,
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues:
      initialValues ||
      fields.flat().reduce(
        (acc, field) => {
          return ({
            ...acc,
            [field.name]: field.defaultValue || "",
          })
        },
        {}
      ),
  });


  // FOR EDIT OR VIEW
  const generateSelectedFields = (fields)=>{
    const selectedFields = {};
    fields.flat().forEach((field) => {
      switch (field.type) {
        case 'manyToOne':{
          selectedFields[field.name] = {
            fields : field.selectedFields || {}
          };
          break;
        }
        case 'tags':{
          selectedFields[field.name] = {
            fields : field.selectedFields || {}
          };
          break;
        }
        case 'lines':{
          const my_fields = generateSelectedFields(field.formFiels);
          selectedFields[field.name] = {
            fields : my_fields || {}
          };
          break;
        }
        default : {
          selectedFields[field.name] = {};
          break;
        }
      }
    });
    return selectedFields;
  }


  useEffect(() => {
    const fetchRecord = async () => {
      if (id && model) {
        try {
          setLoading(true);
          const fieldsSpec = generateSelectedFields(fields);
          ////console.log(JSON.stringify(fieldsSpec, null, 2))
          const { data } = await post("/mobile/api/internal/mobile-data", {
            params: {
              model,
              method: "web_read",
              args: [id],
              kwargs: {
                specification: fieldsSpec,
              },
            },
          });

          //console.log(data)
          
          if (data && data?.length > 0) {
              const record = data[0];
              const formData = {};
              fields.flat().forEach((field) => {
                switch (field.type) {
                  case 'lines':{
                    let value = record[field.name].map((line) => ({
                      ...line,
                      odoo_id: line.id, // simpan ID asli Odoo di property `odoo_id`
                    }));
                    formData[field.name] = value;
                    break;
                  }
                  case 'tags':{
                    let value = record[field.name].map((tag) => ({
                      ...tag,
                      odoo_id: tag.id, // simpan ID asli Odoo di property `odoo_id`
                    }));
                    formData[field.name] = value;
                    break;
                  }
                  default:{
                    let value = record[field.name];
                    formData[field.name] = value;
                    break;
                  }
                }
              });
              reset(formData);
              setFormReady(true);
            }
        } catch (error) {
          //console.error("Error fetching record:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setFormReady(true);
      }
    };
    fetchRecord();
  }, [id, model, reset, setValue, basecolor, fields]);







  const isStepValid = async (stepIndex) => {
    const stepFields = fields[stepIndex - 1];
    const fieldNames = stepFields.map((field) => field.name);
    const result = await trigger(fieldNames);
    return result;
  };





  const defaultOnSubmit = useCallback(async (safetyValue) => {
      if (!fields || !model) {
        onBack?.();
      }
      const dirtyValue = getValues();
      //console.log('OOOKE 1')
      const cleanValue = convertValue(safetyValue, fields, dirtyValue);
      //console.log('OOOKE 2')
     // //console.log(cleanValue)
      try {
        if (id) {
          const { data } = await post("/mobile/api/internal/mobile-data", {
            params: {
              model: model,
              method: "web_save",
              args: [[id], cleanValue],
              kwargs: {
                specification :{}
              },
            },
          });
          //console.log(data);
          onBack?.();
        }else{
          const { data } = await post("/mobile/api/internal/mobile-data", {
            params: {
              model: model,
              method: "web_save",
              args: [[], cleanValue],
              kwargs: {
                specification :{}
              },
            },
          });
        }
      } catch (error) {
        //console.error("Error saving scheduled flight:", error);
        throw error;
      }finally{
        //setLoading(false);
       // onBack?.();
      }
    },
    [id, model, fields, onBack, getValues]
  );







  const handleNext = async () => {
    const isValid = await isStepValid(step);
    if (step < totalSteps && isValid) {
      setStep(step + 1);
    } else if (step === totalSteps && isValid) {
      if (onSubmit) {
        ////console.log('SUBMIT FROM PARENT')
        handleSubmit(onSubmit)();
      }else{
        ////console.log('SUBMIT FROM HERE')
        handleSubmit(defaultOnSubmit)();
      }
    }
  };



  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      onBack?.();
    }
  };




  

  const renderField = (field) => {
    const props = {
      control,
      name: field.name,
      label: field.title || field.label || field.name,
      error: errors[field.name]?.message,
      placeholder: field.placeholder,
      icon: field.icon,
      ...field,
    };

    switch (field.type) {
      case "char":
        return <CharInput key={field.name} {...props} basecolor={basecolor}/>;
      case "number":
        return <NumberInput key={field.name} {...props} basecolor={basecolor}/>;
      case "text":
        return <TextAreaInput key={field.name} {...props} basecolor={basecolor}/>;
      case "phoneNumber":
        return <PhoneInput key={field.name} {...props} basecolor={basecolor}/>;
      case "email":
        return <EmailInput key={field.name} {...props} basecolor={basecolor}/>;
      case "manyToOne":
        return <ManyToOneInput key={field.name} {...props} basecolor={basecolor}/>;
      case "tags":
        return <TagsInput key={field.name} {...props} basecolor={basecolor}/>;
      case "lines":
        return (
          <LinesInput
            key={field.name}
            {...props}
            formFields={field.formFiels}
            basecolor={basecolor}
            setValue={setValue}
          />
        );
      case "map-single-point":
        return <MapSinglePointInput key={field.name} {...props} />;

        case "date":
          case "time":
          case "datetime":
            return (
              <DateInput
                key={field.name}
                {...props}
                mode={field.type}
                format={field.format}
                minDate={field.minDate}
                maxDate={field.maxDate}
              />
            );
      default:
        return <CharInput key={field.name} {...props} basecolor={basecolor}/>;
    }
  };


  if (loading || !formReady) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color={basecolor || "#009688"} />
      </View>
    );
  }






  return (
    <ScrollView className="flex-1 p-4">
      {showProgress && (
        <View className="mb-6">
          <View className="flex-row justify-between mb-2">
            <Text className="text-sm font-medium text-gray-600">Progress</Text>
            <Text
              className="text-sm font-medium"
              style={{ color: basecolor || "#009688" }}
            >
              Step {step} of {totalSteps}
            </Text>
          </View>
          <View className="h-2 bg-gray-200 rounded-full">
            <View
              className="h-full rounded-full transition-all"
              style={{
                width: `${(step / totalSteps) * 100}%`,
                backgroundColor: basecolor || "#009688",
              }}
            />
          </View>
        </View>
      )}

      <View className="rounded-xl p-2  mb-6">
        {fields[step - 1].map((field) => renderField(field))}
      </View>

      <View className="flex-row space-x-4">
        <TouchableOpacity
          className="flex-1 p-4 rounded-xl mb-8 bg-gray-200"
          onPress={handleBack}
        >
          <Text className="text-gray-700 text-center font-semibold text-lg">
            Back
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="flex-1 p-4 rounded-xl mb-8"
          style={{ backgroundColor: basecolor || "#009688" }}
          onPress={handleNext}
        >
          <Text className="text-white text-center font-semibold text-lg">
            {step === totalSteps ? "Submit" : "Continue"}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};




// -----------------------------------------------------------------------------
// convertValue: bentuk list of commands Odoo (0,1,2) untuk Lines
function convertValue(formData, fields, dirtyValue) {
  const final_value = {};
  fields.flat().forEach((item) => {
    switch (item.type) {
      case "lines": {

        const fieldName = item.name;
        const dataLines = formData[fieldName] || [];
        // Baca juga removed lines yang disimpan di formData
        const removedLines = dirtyValue[`${fieldName}___removedLines`] || [];
        const lineCommands = [];



        // 1) Baris yang masih ada di form (update atau create)
        dataLines.forEach((line) => {
          // Proses data child
          const childrenVal = convertValue(line, item.formFiels, dirtyValue);
          if (line.odoo_id) {
            // existing record => update
            lineCommands.push([1, line.odoo_id, childrenVal]);
          } else {
            // new record => create
            lineCommands.push([0, 0, childrenVal]);
          }
        });

        // 2) Baris yang dihapus (yang punya id di Odoo)
        removedLines.forEach((odooLineId) => {
          if (odooLineId) {
            lineCommands.push([2, odooLineId, false]);
          }
        });

        final_value[fieldName] = lineCommands;
        break;
      }

      case "manyToOne": {
        const value = formData[item.name];
        if (value && typeof value === "object" && item.optionValue in value) {
          final_value[item.name] = value[item.optionValue];
        } else {
          final_value[item.name] = false; // misal tidak dipilih
        }
        break;
      }

      case "manyToOne": {
        const value = formData[item.name];
        if (value && typeof value === "object" && item.optionValue in value) {
          final_value[item.name] = value[item.optionValue];
        } else {
          final_value[item.name] = false; // misal tidak dipilih
        }
        break;
      }

      case "tags": {
        const tags = formData[item.name] || [];
        final_value[item.name] = tags.map((item_tag) => item_tag[item.optionValue]);
        break;
      }

      case "date": {
        const rawDate = formData[item.name];
        if (!rawDate) {
          final_value[item.name] = false;
        } else {
          const odooDateString = dayjs.utc(rawDate).format("YYYY-MM-DD");
          final_value[item.name] = odooDateString;
        }
        break;
      }
      case "datetime": {
        const rawDate = formData[item.name];
        if (!rawDate) {
          final_value[item.name] = false;
        } else {
          const odooDateString = dayjs.utc(rawDate).format("YYYY-MM-DD hh:mm:ss");
          final_value[item.name] = odooDateString;
        }
        break;
      }

      default: {
        final_value[item.name] = formData[item.name];
        break;
      }
    }
  });

  return final_value;
}
