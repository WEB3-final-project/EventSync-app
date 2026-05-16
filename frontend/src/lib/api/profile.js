export const getSpeakerProfile = async (id)=> {
  let response; 
  try {
    response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/profile/speakers/${id}`, {
      method: "GET",
    });
    const data = await response.json();
    if (response.ok) {
      return {status:response.status, success: true, speaker: data.speaker};
    }
    return{
      status: response.status,
      success: false,
      message: data.message || "something went wrong",
    }
  } catch {
    return { status: response ? response.status : 500, success: false, message: "Can not connect to the server" };
  }
};