import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
  collection,
  getDocs,
  orderBy,
  query
} from 'firebase/firestore';
import { db } from '../services/firebase'; // Adjust path as needed

const DailyQuotesScreen = () => {
  const [quotes, setQuotes] = useState([]);
  const [currentQuote, setCurrentQuote] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchQuotes = async () => {
      setLoading(true);
      try {
        const q = query(collection(db, 'quotes'), orderBy('createdAt', 'desc'));
        const snapshot = await getDocs(q);
        const fetchedQuotes = [];
        snapshot.forEach((docSnap) => {
          fetchedQuotes.push({ id: docSnap.id, ...docSnap.data() });
        });
        setQuotes(fetchedQuotes);
        if (fetchedQuotes.length > 0) {
          setCurrentQuote(getRandomQuote(fetchedQuotes));
        }
      } catch (error) {
        console.log('Error fetching quotes:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchQuotes();
  }, []);

  const getRandomQuote = (quotesArray) => {
    const randomIndex = Math.floor(Math.random() * quotesArray.length);
    return quotesArray[randomIndex];
  };

  const handleAnotherQuote = () => {
    if (quotes.length > 0) {
      setCurrentQuote(getRandomQuote(quotes));
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#555" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Daily Quote</Text>
      </View>

      {currentQuote ? (
        <View style={styles.quoteContainer}>
          <Text style={styles.quoteText}>
            “{currentQuote.text}”
          </Text>
          <Text style={styles.authorText}>
            — {currentQuote.author}
          </Text>
        </View>
      ) : (
        <Text style={styles.noQuotesText}>No quotes available.</Text>
      )}

      {quotes.length > 0 && (
        <TouchableOpacity style={styles.anotherButton} onPress={handleAnotherQuote}>
          <Text style={styles.anotherButtonText}>Another Quote</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default DailyQuotesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F2F9',
    paddingHorizontal: 20,
    paddingTop: 60
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40
  },
  backButton: {
    marginRight: 10,
    paddingHorizontal: 8,
    paddingVertical: 4
  },
  backButtonText: {
    fontSize: 16,
    color: '#7B7F9E',
    fontWeight: '500'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
    marginRight: 25
  },
  quoteContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  quoteText: {
    fontSize: 24,
    fontStyle: 'italic',
    color: '#4A4A4A',
    textAlign: 'center',
    marginHorizontal: 20,
    marginBottom: 20,
    lineHeight: 34
  },
  authorText: {
    fontSize: 18,
    color: '#7A7A7A',
    textAlign: 'center'
  },
  anotherButton: {
    backgroundColor: '#A88FDC',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    marginBottom: 60
  },
  anotherButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600'
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  noQuotesText: {
    flex: 1,
    textAlign: 'center',
    marginTop: 50,
    fontSize: 18,
    color: '#666'
  }
});
