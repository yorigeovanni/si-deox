import React, { useCallback, useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import styles from './styles';
import { Icon, Text, Button } from '@/components';
import { BaseColor, useTheme } from '@/config';
import Modal from 'react-native-modal';
import { useTranslation } from 'react-i18next';




export default function FilterSort(props) {
  const { colors } = useTheme();
  const { t } = useTranslation();

  const [sortOption, setSortOption] = useState(props.sortOption);
  const [sortSelected, setSortSelected] = useState(props.sortSelected);
  const [modalVisible, setModalVisible] = useState(false);

  const onSelectSort = useCallback((selected) => {
    if (!selected.order) {
      selected.order = 'ASC';
    }



    setSortOption(prevSortOption => prevSortOption.map(item =>
      item.field === selected.field
        ? { ...item, order: item.order === 'ASC' ? 'DESC' : 'ASC' } // ✅ Membuat objek baru
        : item
    ));
  }, []);





  const onApply = () => {
    const { onChangeSort } = props;
    onChangeSort(sortOption);
    setModalVisible(false);
  };



  const iconModeView = modeView => {
    switch (modeView) {
      case 'block':
        return 'square';
      case 'grid':
        return 'th-large';
      case 'list':
        return 'th-list';
      default:
        return 'th-list';
    }
  };

  const { style, modeView, onFilter, onChangeView } = props;

  return (
    <View style={[styles.contain, { backgroundColor: colors.background }, style]}>
      <Modal
        isVisible={modalVisible}
        onSwipeComplete={() => {
          setModalVisible(false);
          setSortOption(props.sortOption);
        }}
        swipeDirection={['down']}
        style={styles.bottomModal}>
        <View
          style={[styles.contentFilterBottom, { backgroundColor: colors.card }]}>
          <View style={styles.contentSwipeDown}>
            <View style={styles.lineSwipeDown} />
          </View>
          {sortOption.map((item, index) => (
            <TouchableOpacity
              style={[
                styles.contentActionModalBottom,
                { borderBottomColor: colors.border },
              ]}
              key={index}
              onPress={() => onSelectSort(item)}>
              <Text body2 semibold primaryColor={false}>{item?.title}</Text>
              {item.order === 'ASC' ? (<Icon name="arrow-up" size={14} color={colors.primary} />) : (<Icon name="arrow-down" size={14} color={colors.primary} />)}
            </TouchableOpacity>
          ))}
          <Button
            full
            style={{ marginTop: 10, marginBottom: 20 }}
            onPress={() => onApply()}>
            {t('apply')}
          </Button>
        </View>
      </Modal>
      <TouchableOpacity
        style={{ flexDirection: 'row', alignItems: 'center' }}
        onPress={() => setModalVisible(true)}>
        <Icon
          name="sort-amount-up"
          size={16}
          color={BaseColor.grayColor}
          solid
        />
        <Text headline grayColor style={{ marginLeft: 5 }}>
          {t(sortSelected?.langKey ?? 'sort')}
        </Text>
      </TouchableOpacity>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity onPress={onChangeView} style={styles.contentModeView}>
          <Icon
            name={iconModeView(modeView)}
            size={16}
            color={BaseColor.grayColor}
            solid
          />
        </TouchableOpacity>
        <View style={styles.line} />
        <TouchableOpacity onPress={onFilter} style={styles.contentFilter}>
          <Icon name="filter" size={16} color={BaseColor.grayColor} solid />
          <Text headline grayColor style={{ marginLeft: 5 }}>
            {t('filter')}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

/*

FilterSort.defaultProps = {
  style: {},
  sortOption: [],
  sortSelected: null,
  modeView: '',
  onChangeSort: () => {},
  onChangeView: () => {},
  onFilter: () => {},
};
*/