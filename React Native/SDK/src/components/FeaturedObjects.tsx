import React, {memo} from 'react';
import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Paragraph} from './Paragraph';
import {FeaturedObjectItemAuto} from './FeaturedObjectItemAuto';

interface Props {
  relatedIds: string[];
}

const FeaturedObjects: React.FC<Props> = ({relatedIds}) => {
  return (
    <>
      <View style={styles.featuredObjects}>
        <View style={styles.featuredObjectsHeader}>
          <Paragraph size={17} color="black">
            Featured objects
          </Paragraph>
          <TouchableOpacity>
            <Paragraph size={17} color="background">
              More
            </Paragraph>
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        data={relatedIds}
        renderItem={({item, index}) => (
          <FeaturedObjectItemAuto objectId={item} />
        )}
        contentContainerStyle={{gap: 32, paddingBottom: 12}}
        ListHeaderComponent={<View style={{marginTop: 10}} />}
        ListFooterComponent={<View style={{paddingBottom: 100}} />}
        onEndReached={() => {}}
      />
    </>
  );
};

const styles = StyleSheet.create({
  featuredObjects: {
    marginTop: 20,
  },
  featuredObjectsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // marginVertical: 10,
  },
});
export default FeaturedObjects;
