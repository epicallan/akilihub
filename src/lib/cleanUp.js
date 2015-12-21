/**
 * data clean up utilities
 */
import uid from 'uid';
import utils from './utils';

class CleanUp {

  removeSelfPosts(poster, data) {
    const newData = [];
    data.forEach((d) => {
      if (!utils.isEmpty(d.poster)) {
        if (d.poster.trim() !== poster) {
          newData.push(d);
        }
      }
    });
    return newData;
  }

  assignIds(data) {
    data.forEach((post, index) => {
      if (post === undefined) data.splice(index, 1);
      if (post.id === undefined) post.id = uid(10);
    });
    return data;
  }

  fbData(data) {
    // TODO make fb data schema match twitters
    return data;
  }

  tweeterData(data) {
    const twitterData = data.map((tweet) => {
      const obj = {};
      obj.created_at = tweet.created_at;
      obj.text = tweet.text;
      obj.user_name = tweet.user.name;
      obj.location = tweet.user.location;
      obj.time_zone = tweet.user.time_zone;
      obj.retweet_count = tweet.retweet_count;
      obj.favorite_count = tweet.favorite_count;
      obj.user_id = tweet.user.id;
      obj.id = tweet.id;
      obj.geo_enabled = false;
      obj.is_reply = tweet.in_reply_to_status_id === null || !tweet.in_reply_to_status_id ? false : true;
      if (obj.is_reply) {
        obj.in_reply_to_status_id = tweet.in_reply_to_status_id;
      }
      if (tweet.place) {
        obj.coordinates = tweet.place.bounding_box.coordinates;
        obj.country = tweet.place.country;
        obj.geo_enabled = true;
      }
      obj.has_hashtags = false;
      if (tweet.entities.hashtags.length) {
        obj.has_hashtags = true;
        obj.hastags = tweet.entities.hashtags.map(tag => tag.text);
      }
      obj.has_user_mentions = false;
      if (tweet.entities.user_mentions.length) {
        obj.has_user_mentions = true;
        obj.user_mentions = tweet.entities.user_mentions.map(user => user.name);
      }
      return obj;
    });
    return twitterData;
  }
}
export default new CleanUp();
