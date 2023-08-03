const CreatePod = `
mutation createPods {
    createPods(dashPodInput: {accountId: "A3", podMacId: "sassssa", podName: "ss", podType: "k", start_date: "2023-03-19"}) {
      message
      status
    }
  }
`