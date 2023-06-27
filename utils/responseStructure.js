import mute from "immutable";

const responseStructure = mute.Map({
  success: null,
  message: "",
  type: "",
  data: null,
  status: null,
});

export default responseStructure;
