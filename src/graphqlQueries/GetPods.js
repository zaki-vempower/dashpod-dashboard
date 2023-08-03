const GetPods = `
query getPodsByAccountId {
    getPodsByAccountId(accountId: "A2") {
      status
      data {
        accountId
        podMacId
        podName
        createdAt
        podType
        update_date
        start_date
        updatedAt
      }
    }
  }
`