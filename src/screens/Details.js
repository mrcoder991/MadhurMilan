import {
  Dimensions,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import React from 'react';
import { DEFAULT_PROFILE_IMAGE } from '../constants';
import { Card, Chip, List, Text, useTheme } from 'react-native-paper';
import { getAge, splitWords } from '../utils';
import { SafeAreaView } from 'react-native-safe-area-context';

const Details = ({ route }) => {
  const data = route.params.data;
  const theme = useTheme();
  const styles = getStyles(theme);
  return (
    <SafeAreaView edges={['right', 'bottom', 'left']} style={styles.container}>
      <StatusBar
        backgroundColor={theme.colors.elevation.level2}
        barStyle={true ? 'light-content' : 'dark-content'}
      />
      <ScrollView>
        <Image
          source={{
            uri: data.profileImg || DEFAULT_PROFILE_IMAGE,
          }}
          style={styles.image}
        />

        <View styles={styles.infoContainer}>
          <Text
            selectable
            variant="headlineMedium"
            style={[styles.text, styles.titleText]}>
            {data.name}, {getAge(data.birthDate)}
          </Text>
          <List.Item
            title={`${data.profession} @${data.companyName}`}
            left={props => <List.Icon {...props} icon="briefcase" />}
          />
          <List.Item
            title={data.candidateCity}
            left={props => <List.Icon {...props} icon="map-marker" />}
          />
          <List.Item
            title={`${data.weight}Kg · ${data.height}" · ${data.profileFor} · ${data.maritalStatus}`}
            left={props => <List.Icon {...props} icon="information" />}
          />
          <List.Item
            title={data.memberRegistrationId}
            left={props => <List.Icon {...props} icon="identifier" />}
          />

          <Card style={styles.card}>
            <Card.Content>
              <List.Subheader>About me</List.Subheader>
              <List.Item
                title={data.instituteName}
                description={data.education}
                left={props => <List.Icon {...props} icon="school" />}
              />
              <List.Item
                title={data.annualIncome}
                description="Per Annum"
                left={props => <List.Icon {...props} icon="wallet" />}
              />
              <List.Item
                title={data.knownLanguages}
                description={`${data.motherTongue} (Mother Tongue)`}
                left={props => <List.Icon {...props} icon="translate" />}
              />
              <List.Item
                title={data.bloodGroup}
                left={props => <List.Icon {...props} icon="blood-bag" />}
              />
              <List.Item
                title={data.birthDate}
                left={props => <List.Icon {...props} icon="cake-variant" />}
              />

              <List.Subheader>Expectations</List.Subheader>
              <View style={[styles.chips]}>
                {splitWords(data.expectations).map((item, index) => (
                  <Chip mode="outlined" key={index} icon="thought-bubble">
                    {item}
                  </Chip>
                ))}
              </View>

              <List.Subheader>Hobbies</List.Subheader>
              <View style={[styles.chips]}>
                {splitWords(data.Hobbies).map((item, index) => (
                  <Chip key={index} icon="gamepad">
                    {item}
                  </Chip>
                ))}
              </View>
            </Card.Content>
          </Card>

          <List.Subheader>Contact Details</List.Subheader>
          <List.Item
            title={'8798675654'}
            left={props => <List.Icon {...props} icon="phone" />}
          />
          <List.Item
            title={'dummy@email.com'}
            left={props => <List.Icon {...props} icon="email" />}
          />

          <List.Section title="Other Details">
            <List.Accordion
              title="General"
              left={props => <List.Icon {...props} icon="database-alert" />}>
              <List.Item
                title={`Residential Address: ${data.residentialAddress}, ${data.state}`}
              />
              <List.Item title={`Cast/Subcast: ${data.casteAndSubCaste}`} />
              <List.Item title={`Gotra: ${data.gotra}`} />
              <List.Item title={`Birth Time: ${data.birthTime}`} />
              <List.Item title={`Birth Place: ${data.birthPlace}`} />
              <List.Item
                title={`Intrested In Kundali Matching: ${data.intrestedInKundaliMatching}`}
              />
              <List.Item title={`Complexion: ${data.complexion}`} />
              <List.Item title={`Hadicapped: ${data.hadicapped}`} />
            </List.Accordion>

            <List.Accordion
              title="Father"
              left={props => <List.Icon {...props} icon="human-male-child" />}>
              <List.Item title={`Name: ${data.fathersName}`} />
              <List.Item title={`Contact: ${data.fathersContactNumber}`} />
              <List.Item title={`Email: ${data.fathersEmail}`} />
              <List.Item title={`Occupation: ${data.fathersOccupation}`} />
              <List.Item title={`Income: ${data.fathersIncome}`} />
            </List.Accordion>

            <List.Accordion
              title="Mother"
              left={props => <List.Icon {...props} icon="human-female-boy" />}>
              <List.Item title={`Name: ${data.mothersName}`} />
              <List.Item title={`Contact: ${data.mothersContactNumber}`} />
              <List.Item title={`Email: ${data.mothersEmail}`} />
              <List.Item title={`Occupation: ${data.mothersOccupation}`} />
            </List.Accordion>

            <List.Accordion
              title="Siblings"
              left={props => <List.Icon {...props} icon="human-male-female" />}>
              <List.Item title={`Married Brothers: ${data.marriedBrothers}`} />
              <List.Item
                title={`Unmarried Brothers: ${data.unmarriedBrothers}`}
              />
              <List.Item title={`Married Sisters: ${data.marriedSisters}`} />
              <List.Item
                title={`Unmarried Sisters: ${data.unmarriedSisters}`}
              />
            </List.Accordion>
          </List.Section>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Details;

const { width } = Dimensions.get('window');

const getStyles = StyleSheet.create(theme => ({
  container: {
    flex: 1,
  },
  image: {
    width: width,
    aspectRatio: '1/1',
  },
  infoContainer: {
    flex: 1,
    paddingTop: theme.padding,
  },
  text: {
    paddingLeft: theme.padding,
  },
  titleText: {
    paddingTop: theme.padding,
  },
  card: {
    margin: theme.padding,
  },
  chips: {
    flexDirection: 'row',
    marginLeft: theme.padding,
    marginRight: theme.padding,
    marginBottom: theme.padding,
    gap: theme.padding,
    flexWrap: 'wrap',
  },
}));
