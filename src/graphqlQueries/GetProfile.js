const GetProfile = `
query getProfiles ($accountId: String!){
    getProfiles(accountId: $accountId, last_upd_time: "2023-03-21") {
      status
      data {
        playerId
      accountId
      profileId
      academyName
      firstName
      lastName
      mobileNumber
      emailId
      dob
      height
      weight
      gender
      updateMeasurements
      updateInterval
      buildingName
      street
      locality
      city
      state
      country
      pinCode
      location
      areasOfIntrest
      }
      message
    }
  }
`
export default GetProfile;