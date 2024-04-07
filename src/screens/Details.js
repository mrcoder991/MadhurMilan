import { Dimensions, Image, ScrollView, StyleSheet, View } from 'react-native';
import React from 'react';
import { DEFAULT_PROFILE_IMAGE } from '../constants';
import { Avatar, Card, Chip, List, Text, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomStatusBar from '../components/CustomStatusBar';
import { getAge, splitWords } from '../utils';

const Details = ({ route }) => {
  const data = route.params.data;
  const theme = useTheme();
  const styles = getStyles(theme);
  return (
    <SafeAreaView edges={['right', 'bottom', 'left']} style={styles.container}>
      <CustomStatusBar />
      <ScrollView>
        <Image
          source={{
            uri: data.profileImg || DEFAULT_PROFILE_IMAGE,
          }}
          style={styles.image}
        />

        <View styles={styles.infoContainer}>
          {/* Heading name */}
          <Text
            selectable
            variant="headlineMedium"
            style={[styles.text, styles.titleText]}>
            {data.name}
          </Text>

          {/* Profession */}
          {!!data.profession && (
            <List.Item
              title={data.profession}
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

          {/* Birthdate */}
          {!!data.birthDate && (
            <List.Item
              title={`${getAge(data.birthDate)} Years old`}
              left={props => <List.Icon {...props} icon="timer-sand" />}
            />
          )}

          {/* Profile for and mariatal status */}
          {(!!data.profileFor || !!data.maritalStatus) && (
            <List.Item
              title={
                data.profileFor && data.maritalStatus
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
              <Card.Title title="Candidate info" />

              {/* Known Languages and mother toungue */}
              {(!!data.knownLanguages || !!data.motherTongue) && (
                <List.Item
                  title={
                    data.motherTongue
                      ? `Mother Tongue: ${data.motherTongue}`
                      : data.knownLanguages
                  }
                  description={data.knownLanguages ? data.knownLanguages : null}
                  left={props => <List.Icon {...props} icon="translate" />}
                />
              )}

              {/* CasteAndSubCaste */}
              {!!data.casteAndSubCaste && (
                <List.Item
                  title="Caste and Subcaste "
                  description={data.casteAndSubCaste}
                  left={props => <List.Icon {...props} icon="flag" />}
                />
              )}

              {/* Gotra */}
              {!!data.gotra && (
                <List.Item
                  title="Gotra"
                  description={data.gotra}
                  left={props => <List.Icon {...props} icon="star-david" />}
                />
              )}

              {(!!data.unmarriedBrothers ||
                !!data.unmarriedSisters ||
                !!data.marriedBrothers ||
                !!data.marriedSisters) && (
                <List.Subheader>Siblings</List.Subheader>
              )}

              {/* Unmarried Siblings */}
              {(!!data.unmarriedBrothers || !!data.unmarriedSisters) && (
                <List.Item
                  title="Unmarried"
                  description={
                    !!data.unmarriedBrothers && !!data.unmarriedSisters
                      ? `Brother (${data.unmarriedBrothers}), Sister (${data.unmarriedSisters})`
                      : data.unmarriedBrothers
                      ? `Brother (${data.unmarriedBrothers})`
                      : `Sister (${data.unmarriedSisters})`
                  }
                  left={props => (
                    <List.Icon {...props} icon="human-male-female" />
                  )}
                />
              )}

              {/* Married Siblings */}
              {(!!data.marriedBrothers || !!data.marriedSisters) && (
                <List.Item
                  title="Married"
                  description={
                    !!data.marriedBrothers && !!data.marriedSisters
                      ? `Brother (${data.marriedBrothers}), Sister (${data.marriedSisters})`
                      : data.marriedBrothers
                      ? `Brother (${data.marriedBrothers})`
                      : `Sister (${data.marriedSisters})`
                  }
                  left={props => (
                    <List.Icon {...props} icon="human-male-female" />
                  )}
                />
              )}
            </Card.Content>
          </Card>

          <Card style={styles.card} mode="contained">
            <Card.Content>
              <Card.Title title="Birth & Physical Information" />

              {/* Birth Details */}
              {(!!data.birthDate || !!data.birthPlace) && (
                <List.Item
                  title={`DOB: ${data.birthDate}`}
                  description={
                    !!data.birthPlace && !!data.birthTime
                      ? `${data.birthPlace}, ${data.birthTime}`
                      : data.birthPlace || data.birthTime
                  }
                  left={props => (
                    <List.Icon {...props} icon="human-baby-changing-table" />
                  )}
                />
              )}

              {/* Intrested In Kundali Matching: */}
              {!!data.intrestedInKundaliMatching && (
                <List.Item
                  title="Intrested In Kundali Matching"
                  description={data.intrestedInKundaliMatching}
                  left={props => <List.Icon {...props} icon="star-david" />}
                />
              )}

              {/* complexion */}
              {!!data.complexion && (
                <List.Item
                  title="Complexion"
                  description={data.complexion}
                  left={props => (
                    <List.Icon
                      {...props}
                      icon={
                        data.profileFor === 'Bride'
                          ? 'face-woman-shimmer'
                          : 'face-man-shimmer'
                      }
                    />
                  )}
                />
              )}

              {/* hadicapped */}
              {!!data.hadicapped && (
                <List.Item
                  title="Hadicapped"
                  description={data.hadicapped}
                  left={props => (
                    <List.Icon {...props} icon="wheelchair-accessibility" />
                  )}
                />
              )}

              {/* Blood group */}
              {!!data.bloodGroup && (
                <List.Item
                  title="Blood Group"
                  description={data.bloodGroup}
                  left={props => <List.Icon {...props} icon="blood-bag" />}
                />
              )}

              {/* Height and weight Cards */}
              <View style={styles.healthInfo}>
                <Card mode="contained">
                  <Card.Content>
                    <Text variant="bodyMedium">Height</Text>
                    <Text variant="titleLarge">{data.height || '-'}</Text>
                  </Card.Content>
                </Card>
                <Card mode="contained">
                  <Card.Content>
                    <Text variant="bodyMedium">Weight</Text>
                    <Text variant="titleLarge">
                      {data.weight ? `${data.weight} Kg` : '-'}
                    </Text>
                  </Card.Content>
                </Card>
              </View>
            </Card.Content>
          </Card>

          <Card style={styles.card} mode="contained">
            <Card.Content>
              <Card.Title title="Educational & Professional Details" />

              {/* Eduaction */}
              {!!data.education && (
                <List.Item
                  title="Academic Course"
                  description={data.education}
                  left={props => (
                    <List.Icon {...props} icon="book-open-page-variant" />
                  )}
                />
              )}

              {/* Institute */}
              {!!data.instituteName && (
                <List.Item
                  title="Institute"
                  description={data.instituteName}
                  left={props => <List.Icon {...props} icon="school" />}
                />
              )}

              {/* Profession */}
              {!!data.profession && (
                <List.Item
                  title="Profession"
                  description={data.profession}
                  left={props => <List.Icon {...props} icon="briefcase" />}
                />
              )}

              {/* Company */}
              {!!data.companyName && (
                <List.Item
                  title="Company"
                  description={data.companyName}
                  left={props => (
                    <List.Icon {...props} icon="office-building" />
                  )}
                />
              )}

              {/* Annual Income*/}
              {!!data.annualIncome && (
                <List.Item
                  title="Annual Income"
                  description={data.annualIncome}
                  left={props => <List.Icon {...props} icon="wallet" />}
                />
              )}
            </Card.Content>
          </Card>

          <Card.Title title="Family Details" />
          <ScrollView horizontal>
            <View style={styles.parentsCards}>
              {/* Fathers Details Card */}
              <Card mode="outlined">
                <Card.Content>
                  <View style={styles.pCard}>
                    <Avatar.Icon
                      backgroundColor={theme.colors.tertiary}
                      icon="human-male-child"
                      size={50}
                    />
                    <View style={styles.pCardTitle}>
                      <Text variant="bodyMedium">Father's Info</Text>
                      <Text
                        selectable
                        variant="titleLarge"
                        style={styles.textWrap}>
                        {data.fathersName || '-'}
                      </Text>
                    </View>
                  </View>
                  <Text selectable variant="bodyLarge" style={styles.pCardBody}>
                    Contact: {data.fathersContactNumber || '-'}
                  </Text>
                  <Text selectable variant="bodyLarge" style={styles.pCardBody}>
                    Email: {data.fathersEmail || '-'}
                  </Text>
                  <Text variant="bodyLarge" style={styles.pCardBody}>
                    Occupation: {data.fathersOccupation || '-'}
                  </Text>
                  <Text variant="bodyLarge" style={styles.pCardBody}>
                    Income: {data.fathersIncome || '-'}
                  </Text>
                </Card.Content>
              </Card>

              {/* Mothers Details Card */}
              <Card mode="outlined">
                <Card.Content>
                  <View style={styles.pCard}>
                    <Avatar.Icon
                      backgroundColor={theme.colors.secondary}
                      icon="human-female-boy"
                      size={50}
                    />
                    <View style={styles.pCardTitle}>
                      <Text variant="bodyMedium">Mother's Info</Text>
                      <Text
                        selectable
                        variant="titleLarge"
                        style={styles.textWrap}>
                        {data.mothersName || '-'}
                      </Text>
                    </View>
                  </View>
                  <Text selectable variant="bodyLarge" style={styles.pCardBody}>
                    Contact: {data.mothersContactNumber || '-'}
                  </Text>
                  <Text selectable variant="bodyLarge" style={styles.pCardBody}>
                    Email: {data.mothersEmail || '-'}
                  </Text>
                  <Text variant="bodyLarge" style={styles.pCardBody}>
                    Occupation: {data.mothersOccupation || '-'}
                  </Text>
                  <Text variant="bodyLarge" style={styles.pCardBody}>
                    Income: {data.mothersIncome || '-'}
                  </Text>
                </Card.Content>
              </Card>
            </View>
          </ScrollView>

          {/* Expecations */}
          {!!data.expectations && (
            <>
              <Card.Title title="Expectations" />
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
              <Card.Title title="Hobbies" />
              <View style={[styles.chips]}>
                {splitWords(data.hobbies).map((item, index) => (
                  <Chip key={index} icon="gamepad">
                    {item}
                  </Chip>
                ))}
              </View>
            </>
          )}

          {/* Residential Address */}
          <Card.Title title="Residential Address" />
          <Text
            variant="bodyLarge"
            style={[styles.otherDetailsText, styles.onSurfaceVariant]}>
            {`${data.residentialAddress || '-'}`}
          </Text>
          <Text
            variant="bodyLarge"
            style={[styles.otherDetailsText, styles.onSurfaceVariant]}>
            Landline Number: {data.landLineNumber || '-'}
          </Text>

          {/* Family Information */}
          <Card.Title title="Family Information" />
          <Text
            selectable
            variant="bodyLarge"
            style={[styles.otherDetailsText, styles.onSurfaceVariant]}>
            {data.familyInformation || '-'}
          </Text>

          {/* Additional Information */}
          <Card.Title title="Reference (Relative) (अधिक माहितीसाठी संदर्भ /पत्ता )" />
          <Text
            selectable
            variant="bodyLarge"
            style={[styles.otherDetailsText, styles.onSurfaceVariant]}>
            {data.relativeName || '-'}
          </Text>
          {/* <Text
            selectable
            variant="bodyLarge"
            style={[styles.otherDetailsText, styles.onSurfaceVariant]}>
            Relative Address: {data.relativeAddress || '-'}
          </Text>
          <Text
            selectable
            variant="bodyLarge"
            style={[styles.otherDetailsText, styles.onSurfaceVariant]}>
            Relative Landline: {data.relativelandLineNumber || '-'}
          </Text>
          <Text
            selectable
            variant="bodyLarge"
            style={[styles.otherDetailsText, styles.onSurfaceVariant]}>
            Relative Mobile: {data.relativeMobileNumber || '-'}
          </Text> */}
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
    marginBottom: theme.padding,
  },
  image: {
    flex: 1,
    width: width - theme.padding * 2,
    aspectRatio: '3.4/4',
    margin: theme.padding,
    borderRadius: 22,
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
  healthInfo: {
    flexDirection: 'row',
    gap: theme.padding,
  },
  parentsCards: {
    flexDirection: 'row',
    gap: theme.padding,
    marginHorizontal: theme.padding,
    marginBottom: 10,
  },
  pCard: {
    flexDirection: 'row',
    gap: theme.padding,
    alignItems: 'center',
    margin: 8,
    width: width * 0.75,
  },
  pCardTitle: {
    flex: 1,
    gap: 3,
  },
  pCardBody: {
    marginHorizontal: 8,
    marginVertical: 4,
  },
  textWrap: {
    flexWrap: 'wrap',
  },
  otherDetailsTitle: {
    marginVertical: 8,
  },
  otherDetailsText: {
    marginHorizontal: theme.padding,
    marginVertical: 4,
  },
  onSurfaceVariant: {
    color: theme.colors.outline,
  },
}));
