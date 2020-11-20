function fun() {
  const meetingName = sessionStorage.getItem("meet");
  const name = sessionStorage.getItem("name");
  console.log(meetingName);
  const id = Number(sessionStorage.getItem("id1"));
  var detail = sessionStorage.getItem("details");
  const course = sessionStorage.getItem("cid");
  const end = sessionStorage.getItem("end");
  const start = sessionStorage.getItem("start");
  const type = sessionStorage.getItem("type");
  var width1 =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;

  var height1 =
    window.innerHeight ||
    document.documentElement.clientHeight ||
    document.body.clientHeight;
  const domain = "meet.jit.si";
  const options = {
    roomName: meetingName,
    width: width1,
    height: height1,
    configOverwrite: { enableWelcomePage: true },
    interfaceConfigOverwrite: {},
    parentNode: document.querySelector("#meet"),
    userInfo: {
      displayName: name,
    },
  };
  const api = new JitsiMeetExternalAPI(domain, options);
  api.addEventListener("participantJoined", (data) => {
    detail = detail + "~" + data.displayName;
    console.log("in");
    axios
      .put(`https://api.codeasylums.com` + `/updateSchedule/` + `${id}`, {
        assignment: "",
        course_id: course,
        schedule_details: detail,
        schedule_end: end,
        schedule_id: id,
        schedule_start: start,
        schedule_type: type,
      })
      .then((res) => {
        console.log(res);
        console.log("in res");
        sessionStorage.setItem("details", detail);
      });
  });

  api.addEventListener("videoConferenceJoined", (data) => {
    api.executeCommand("startRecording", {
      mode: "file",
      dropboxToken:
        "rA-Ii8UEP5AAAAAAAAAADezGDcRXIWr9lfYFoOr74wTFxrBupBR7mtlmUlP2J7pr",
    });
  });

  api.addEventListener("videoConferenceLeft", (data) => {
    api.executeCommand("stopRecording", {
      mode: "file",
    });
  });
}
