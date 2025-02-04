import { Store } from "@tanstack/react-store";

const state = new Store({
  model: 'x_data_amc',
  title: 'AMC LOG - SCHEDULED',
  viewMode: 'block',
  limit: 20,
  offset: 0,
  domain: [],
  sort: [
    { field: 'write_date', title: 'Last Update', order: 'DESC' },
    //{ field: 'x_studio_sta', title: 'Shecdule Time Arrival', order: 'DESC' },
    //{ field: 'x_studio_ata', title: 'Actual Time Arrival', order: 'DESC' },
  ],
  fields: {
    x_studio_reg_number: {},
    x_studio_operator: { fields: { display_name: {} } },
    x_studio_type_pesawat: { fields: { display_name: {} } },
    x_studio_status: {},
    x_studio_sta: {},
    x_studio_ata: {},
    x_studio_std: {},
    x_studio_atd: {},
    x_studio_type_penerbangan: {},
    x_studio_block_on: {},
    x_studio_block_off: {},
    x_studio_parking_stand: { fields: { display_name: {} } },
    write_date: {},
    write_uid: { fields: { display_name: {} } },
    create_uid: { fields: { display_name: {} } },
    create_date: {},
    x_studio_extra_arrivals_flight_number: {
      limit: 40,
      order: "x_studio_sequence ASC, id ASC",
      fields: {
        x_studio_from: {
          fields: {
            display_name: {}
          }
        },
        x_studio_destination: {
          fields: {
            display_name: {}
          }
        },
        x_studio_flight_number: {},
        x_studio_infant: {},
        x_studio_adult: {},
        x_studio_transit: {},
        x_studio_transfer: {},
        x_studio_cargo: {},
        x_studio_baggage: {},
        x_studio_personil_operator_1: {
          fields: {
            display_name: {}
          }
        },
      },
    },
    x_studio_extra_departures_flight_number: {
      limit: 40,
      order: "x_studio_sequence ASC, id ASC",
      fields: {
        x_studio_from: {
          fields: {
            display_name: {}
          }
        },
        x_studio_destination: {
          fields: {
            display_name: {}
          }
        },
        x_studio_flight_number: {},
        x_studio_infant: {},
        x_studio_adult: {},
        x_studio_transit: {},
        x_studio_transfer: {},
        x_studio_cargo: {},
        x_studio_baggage: {},
        x_studio_personil_operator_1: {
          fields: {
            display_name: {}
          }
        }
      }
    }
  },
  filterOptions: [
    {
      title: 'BY CATEGORY',
      options: [
        { title: 'All', value: 'all' },
        { title: 'Scheduled', value: 'scheduled' },
        { title: 'Arrived', value: 'arrived' },
        { title: 'Departured', value: 'departured' },
        { title: 'Cancelled', value: 'cancelled' }
      ]
    },
    {
      title: 'BY AIRPORT',
      options: [
        { title: 'All', value: 'all' },
        { title: 'Scheduled', value: 'scheduled' },
        { title: 'Arrived', value: 'arrived' },
        { title: 'Departured', value: 'departured' },
        { title: 'Cancelled', value: 'cancelled' },
      ]
    },
    {
      title: 'BY AIRCRAFT TYPE',
      options: [
        { title: 'All', value: 'all' },
        { title: 'Scheduled', value: 'scheduled' },
        { title: 'Arrived', value: 'arrived' },
        { title: 'Departured', value: 'departured' },
        { title: 'Cancelled', value: 'cancelled' },
      ]
    },
  ],
  formValue: {},
  selectedId: null,
});

export default state;


