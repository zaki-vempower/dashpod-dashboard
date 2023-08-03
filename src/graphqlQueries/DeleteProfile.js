const DeleteProfile = `
query deleteProfile {
    deleteProfile(playerId:"1238733") {
      status
      playerId
      message
    }
  }
`
export default DeleteProfile;