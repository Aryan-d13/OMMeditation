import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MeditationCard from './MeditationCard';

const MeditationScrollCard = ({ title, cards }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <FlatList
        horizontal
        data={cards}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <MeditationCard
            title={item.title}
            image={item.image}
            description={item.description}
            audio={item.audio}
            onPress={() => {
              navigation.navigate('MeditationSessionPlayer', {
                audio: item.audio,
                title: item.title,
                image: item.image,
              });
            }}
          />
        )}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 30,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    color: '#2D4057',
    marginBottom: 15,
    marginLeft: 10,
    textShadowColor: 'rgba(0,0,0,0.05)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
  },
  listContainer: {
    paddingHorizontal: 10,
  },
});

export default MeditationScrollCard;
