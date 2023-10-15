import {
  Dimensions,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
  useColorScheme,
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
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <SafeAreaView edges={['right', 'bottom', 'left']} style={styles.container}>
      <StatusBar
        backgroundColor={theme.colors.elevation.level2}
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
      />
      <ScrollView>
        <Image
          source={{
            uri: data.profileImg || DEFAULT_PROFILE_IMAGE,
          }}
          style={styles.image}
        />

        <View styles={styles.infoContainer}>
          {/* Heading name and age */}
          <Text
            selectable
            variant="headlineMedium"
            style={[styles.text, styles.titleText]}>
            {typeof getAge(data.birthDate) === 'number'
              ? `${data.name}, ${getAge(data.birthDate)}`
              : data.name}
          </Text>

          {/* Profession and company name */}
          {(!!data.profession || !!data.companyName) && (
            <List.Item
              title={
                data.profession && data.companyName
                  ? `${data.profession} @${data.companyName}`
                  : `${data.profession || data.companyName}`
              }
              left={props => <List.Icon {...props} icon="briefcase" />}
            />
          )}

          {/* Candidate Location */}
          {!!data.candidateCity && (
            <List.Item
              title={data.candidateCity}
              left={props => <List.Icon {...props} icon="map-marker" />}
            />
          )}

          {/* Weight, Height, Profile for and mariatal status */}
          {(!!data.weight || !!data.height) && (
            <List.Item
              title={
                data.weight && data.height
                  ? `${data.weight}Kg · ${data.height}`
                  : `${data.weight || data.height}`
              }
              left={props => <List.Icon {...props} icon="google-fit" />}
            />
          )}

          {/* Profile for and mariatal status */}
          {(!!data.profileFor || !!data.maritalStatus) && (
            <List.Item
              title={
                data.profession && data.companyName
                  ? `${data.profileFor} · ${data.maritalStatus}`
                  : `${data.profileFor || data.maritalStatus}`
              }
              left={props => (
                <List.Icon
                  {...props}
                  icon={data.profileFor === 'Bride' ? 'face-woman' : 'face-man'}
                />
              )}
            />
          )}

          {/* Member registration ID */}
          {!!data.memberRegistrationId && (
            <List.Item
              title={data.memberRegistrationId}
              left={props => <List.Icon {...props} icon="identifier" />}
            />
          )}

          <Card style={styles.card} mode="contained">
            <Card.Content>
              <Card.Title title="About me" />

              {/* Eduaction */}
              {(!!data.instituteName || !!data.education) && (
                <List.Item
                  title={data.instituteName || data.education}
                  description={data.instituteName ? data.education : null}
                  left={props => <List.Icon {...props} icon="school" />}
                />
              )}

              {/* Annual income */}
              {!!data.annualIncome && (
                <List.Item
                  title={data.annualIncome}
                  description="Per Annum"
                  left={props => <List.Icon {...props} icon="wallet" />}
                />
              )}

              {/* Known Languages and mother toungue */}
              {(!!data.knownLanguages || !!data.motherTongue) && (
                <List.Item
                  title={
                    data.knownLanguages
                      ? data.knownLanguages
                      : data.motherTongue
                  }
                  description={
                    data.motherTongue
                      ? `${data.motherTongue} (Mother Tongue)`
                      : null
                  }
                  left={props => <List.Icon {...props} icon="translate" />}
                />
              )}

              {/* Blood group */}
              {!!data.bloodGroup && (
                <List.Item
                  title={data.bloodGroup}
                  left={props => <List.Icon {...props} icon="blood-bag" />}
                />
              )}

              {/* Birthdate */}
              {!!data.birthDate && (
                <List.Item
                  title={data.birthDate}
                  left={props => <List.Icon {...props} icon="cake-variant" />}
                />
              )}

              {/* Expecations */}
              {!!data.expectations && (
                <>
                  <List.Subheader>Expectations</List.Subheader>
                  <View style={[styles.chips]}>
                    {splitWords(data.expectations).map((item, index) => (
                      <Chip mode="outlined" key={index} icon="thought-bubble">
                        {item}
                      </Chip>
                    ))}
                  </View>
                </>
              )}

              {/* Hobbies */}
              {!!data.hobbies && (
                <>
                  <List.Subheader>Hobbies</List.Subheader>
                  <View style={[styles.chips]}>
                    {splitWords(data.hobbies).map((item, index) => (
                      <Chip key={index} icon="gamepad">
                        {item}
                      </Chip>
                    ))}
                  </View>
                </>
              )}
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
              {(!!data.residentialAddress || data.state) && (
                <List.Item
                  title={`Residential Address: ${data.residentialAddress}, ${data.state}`}
                />
              )}

              {!!data.casteAndSubCaste && (
                <List.Item title={`Cast/Subcast: ${data.casteAndSubCaste}`} />
              )}

              {!!data.gotra && <List.Item title={`Gotra: ${data.gotra}`} />}

              {!!data.birthTime && (
                <List.Item title={`Birth Time: ${data.birthTime}`} />
              )}

              {!!data.birthPlace && (
                <List.Item title={`Birth Place: ${data.birthPlace}`} />
              )}

              {!!data.intrestedInKundaliMatching && (
                <List.Item
                  title={`Intrested In Kundali Matching: ${data.intrestedInKundaliMatching}`}
                />
              )}

              {!!data.complexion && (
                <List.Item title={`Complexion: ${data.complexion}`} />
              )}

              {!!data.hadicapped && (
                <List.Item title={`Handicapped: ${data.hadicapped}`} />
              )}
            </List.Accordion>

            <List.Accordion
              title="Father"
              left={props => <List.Icon {...props} icon="human-male-child" />}>
              {!!data.fathersName && (
                <List.Item title={`Name: ${data.fathersName}`} />
              )}

              {!!data.fathersContactNumber && (
                <List.Item title={`Contact: ${data.fathersContactNumber}`} />
              )}

              {!!data.fathersEmail && (
                <List.Item title={`Email: ${data.fathersEmail}`} />
              )}

              {!!data.fathersOccupation && (
                <List.Item title={`Occupation: ${data.fathersOccupation}`} />
              )}

              {!!data.fathersIncome && (
                <List.Item title={`Income: ${data.fathersIncome}`} />
              )}
            </List.Accordion>

            <List.Accordion
              title="Mother"
              left={props => <List.Icon {...props} icon="human-female-boy" />}>
              {!!data.mothersName && (
                <List.Item title={`Name: ${data.mothersName}`} />
              )}

              {!!data.mothersContactNumber && (
                <List.Item title={`Contact: ${data.mothersContactNumber}`} />
              )}

              {!!data.mothersEmail && (
                <List.Item title={`Email: ${data.mothersEmail}`} />
              )}

              {!!data.mothersOccupation && (
                <List.Item title={`Occupation: ${data.mothersOccupation}`} />
              )}
            </List.Accordion>

            <List.Accordion
              title="Siblings"
              left={props => <List.Icon {...props} icon="human-male-female" />}>
              {!!data.marriedBrothers && (
                <List.Item
                  title={`Married Brothers: ${data.marriedBrothers}`}
                />
              )}

              {!!data.unmarriedBrothers && (
                <List.Item
                  title={`Unmarried Brothers: ${data.unmarriedBrothers}`}
                />
              )}

              {!!data.marriedSisters && (
                <List.Item title={`Married Sisters: ${data.marriedSisters}`} />
              )}

              {!!data.unmarriedSisters && (
                <List.Item
                  title={`Unmarried Sisters: ${data.unmarriedSisters}`}
                />
              )}
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
    backgroundColor: theme.colors.elevation.level2,
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
