import axios from "axios";
type WikiPageImage = {
  thumbnail?: {
    source?: string;
  };
};
export const getWikipediaImage = async (
  placeName: string,
  latitude: number,
  longitude: number,
) => {
  try {
    // ------------------------ first try to search by place name -----------------------------------
    let url = `https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(
      placeName,
    )}&gsrlimit=1&prop=pageimages&pithumbsize=600&format=json&origin=*`;
    
    let res = await axios.get(url, {
      headers: {
        "User-Agent": "TravelPlannerBot/1.0 (_; shahnawaz.codes@email.com)",
      },
    });
    let page = res.data?.query?.pages;
    if (page) {
      const imageSource = (Object.values(page)[0] as WikiPageImage)?.thumbnail
        ?.source;
      if (imageSource) {
        return imageSource;
      }
    }

    /// ----------------------- fallback-----------------------------------
    url = `https://en.wikipedia.org/w/api.php?action=query&prop=pageimages&pithumbsize=600&generator=geosearch&ggscoord=${latitude}|${longitude}&ggsradius=500&ggslimit=1&format=json&origin=*`;
    res = await axios.get(url, {
      headers: {
        "User-Agent": "TravelPlannerBot/1.0 (_; shahnawaz.codes@email.com)",
      },
    });
    page = res.data?.query?.pages;

    if (page) {
      const imageSource = (Object.values(page)[0] as WikiPageImage)?.thumbnail
        ?.source as string | null;
      if (imageSource) {
        return imageSource;
      }
    }
    return null;
  } catch (error) {
    console.log("something goes wrong while geting wikipedia img", error);
  }
};
