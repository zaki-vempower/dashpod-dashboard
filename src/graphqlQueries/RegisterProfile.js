const RegisterProfile = `
mutation registerProfile (
    $playerId: String!,
    $accountId: String!,
    $profileId : Int,
    $academyName: String,
    $firstName: String,
    $lastName : String,
    $mobileNumber: String,
    $emailId : String,
    $dob : String,
    $height : String,
    $weight: String,
    $updateMeasurements: String,
    $updateInterval : String,
    $buildingName : String,
    $street : String,
    $locality : String,
    $city : String,
    $state : String,
    $country : String,
    $pinCode : String,
    $location : String,
    $areasOfIntrest : [String!],
    $gender: String,
){
    registerProfile(registerProfileInput: {

      playerId: $playerId,
      accountId: $accountId,
      profileId: $profileId,
      academyName: $academyName,
      firstName: $firstName,
      lastName: $lastName,
      mobileNumber: $mobileNumber,
      emailId: $emailId,
      dob: $dob,
      height: $height,
      weight: $weight,
      gender: $gender,
      updateMeasurements: $updateMeasurements,
      updateInterval: $updateInterval,
      buildingName: $buildingName,
      street: $street,
      locality: $locality,
      city: $city,
      state: $state,
      country: $country,
      pinCode: $pinCode,
      location: $location,
      areasOfIntrest: $areasOfIntrest
    }) {
      message
      status
      playerId
    }
  }
`

export default RegisterProfile;