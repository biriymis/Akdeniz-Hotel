import React, { useState, useEffect } from 'react';
import { View, SafeAreaView, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import axios from 'axios';
import * as Animatable from 'react-native-animatable';

const screenWidth = Dimensions.get('window').width;

export const MainPage: React.FC = () => {
  const [data, setData] = useState([
    { name: 'Booked', percentage: 0, color: '#ff8c00', legendFontColor: '#7F7F7F', legendFontSize: 15 },
    { name: 'Reserved', percentage: 0, color: '#50C878', legendFontColor: '#7F7F7F', legendFontSize: 15 },
    { name: 'Empty', percentage: 0, color: '#d3d3d3', legendFontColor: '#7F7F7F', legendFontSize: 15 }
  ]);

  useEffect(() => {
    fetchChartData();
  }, []);

  const fetchChartData = async () => {
    try {
      const response = await axios.get('https://run.mocky.io/v3/c8918a60-e5e2-4083-a8ce-d35170ec02e8');
      const fetchedData = response.data;

      setData([
        { name: 'Booked', percentage: fetchedData.booked, color: '#ff8c00', legendFontColor: '#7F7F7F', legendFontSize: 15 },
        { name: 'Reserved', percentage: fetchedData.reserved, color: '#50C878', legendFontColor: '#7F7F7F', legendFontSize: 15 },
        { name: 'Empty', percentage: fetchedData.empty, color: '#d3d3d3', legendFontColor: '#7F7F7F', legendFontSize: 15 }
      ]);
    } catch (error) {
      console.error('Veri çekme hatası:', error);
    }
  };
  const chartConfig = {
    backgroundColor: '#1cc910',
    backgroundGradientFrom: '#eff3ff',
    backgroundGradientTo: '#efefef',
    marginTop:100,
    decimalPlaces: 2, 
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16,
    },
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <Animatable.View animation="swing" duration={1500}>
            <PieChart
              data={data}
              width={screenWidth}
              height={220}
              chartConfig={chartConfig}
              accessor="percentage"
              backgroundColor="transparent"
              paddingLeft="20"
              absolute 
            />
          </Animatable.View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:250,
  },

});
