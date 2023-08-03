const CreateRecordActivity = `
     mutation createRecordActivity {
        createRecordActivity(registerActivityInput: {
              recordId: "abc1236",
              accountId: "12345",
              playerId: "player123",
              playerName: "John Doe",
              activityId: "activity123",
              activityName: "Running",
              base: "Base1",
              color:1,
              colorCode: 2,
              startTime: 1679420969864,
              prevMacId: "mac1",
              currentMacId: "mac2",
              hitCount: 10,
              missCount: 5,
              avgTime: "5.5",
              playerAge: "25",
              gender: "Male",
              height: "180",
              weight: "70",
              lastName: "Doe",
              dateAndTime: 1679420969864,
              podsCount: "3",
              activityDuration: "30",
              podName: "Pod1",
              categoryName: "Category1",
              categoryId: "category123",
              analyticsValuesList: [
                  {
                      podName: "analytics123",
                      podColor: "Speed",
                      podAddress: "10.5",
                      isHit:"true",
                      entryX: 4,
                      entryY: 5
                  }
              ]
          }) {
          message
          status
          playerId
        }
      }
`