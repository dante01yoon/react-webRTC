import AgoraRTC, { IAgoraRTCClient, UID, IAgoraRTCRemoteUser } from "agora-rtc-sdk-ng";
import _ from "lodash";
import isNil from "lodash/isNil";

export interface RTC {
  client: IAgoraRTCClient;
  localAudioTrack: Nullable<any>;
  localVideoTrack: Nullable<any>;
  localVideoSubscriber: Nullable<Array<any>>;
}

export class AgoraRTCClient {
  rtc: RTC;
  joined: Record<string, UID> = {};

  constructor() {
    this.rtc = {
      client: AgoraRTC.createClient({ mode: "rtc", codec: "h264" }),
      localAudioTrack: null,
      localVideoTrack: null,
      localVideoSubscriber: [],
    }
  }

  createClient(option?: "audo" | "video") {
    this.rtc.client = AgoraRTC.createClient({ mode: "live", codec: "vp8" });
  }

  async join(channel: string, token: string) {
    let uid;
    try {
      uid = await this.rtc.client.join(process.env.REACT_APP_ID!, channel, token || null);
      if (!isNil(uid)) {
        this.joined[channel] = uid;
      }
    } catch (error) {
      console.error(error);
    }
    return uid;
  }

  async publish({ mediaType }: { mediaType: "audio" | "video" }) {
    const { localAudioTrack, client, localVideoTrack } = this.rtc;
    try {
      if (mediaType === "audio") {
        await client.publish([localAudioTrack]);
      }
      else {
        await client.publish(localVideoTrack);
        if (localAudioTrack) {
          await client.publish(localAudioTrack);
        }
      }
      console.log("publish success");
    } catch (error) {
      console.error(error);
    }
  }

  async publicAudioLocalTrack() {
    this.rtc.localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
  }

  async publicVideoLocalTrack() {
    this.rtc.localVideoTrack = await AgoraRTC.createCameraVideoTrack();
    console.log("this.rtc.localVideoTrack: ", this.rtc.localVideoTrack);
  }

  async publicVideoLocalTrackSynchronously() {
    this.rtc.localVideoTrack = await AgoraRTC.createMicrophoneAndCameraTracks();
  }

  enableAudioVolumeIndicator(callback: (result: {
    level: number;
    uid: UID;
  }[]) => void) {
    const { client } = this.rtc;
    client.enableAudioVolumeIndicator();
    client.on("volume-indicator", callback);
  }

  subscribe(callback?: (user: IAgoraRTCRemoteUser, mediaType: "audio" | "video") => void) {
    const { client } = this.rtc;

    client.on("user-published", async (user, mediaType) => {
      await client.subscribe(user, mediaType);
      console.log("subscribe success");

      if (callback) {
        callback(user, mediaType);
      }
    });
  }

  unSubscribe(callback: (user: IAgoraRTCRemoteUser) => void) {
    const { client } = this.rtc;
    client.on("user-unpublished", user => {
      callback(user);
    });

  }

  playTrack(dom?: string | HTMLElement) {
    return (user: IAgoraRTCRemoteUser, mediaType: "audio" | "video") => {
      if (mediaType === "audio") {
        const audioTrack = user.audioTrack;
        audioTrack?.play();
      } else {
        const videoTrack = user.videoTrack;
        if (dom) {
          videoTrack?.play(dom);
        }
      }
    }
  }

  async leaveCall() {
    const { localAudioTrack, localVideoTrack, client } = this.rtc;

    localAudioTrack?.close();
    localVideoTrack?.close();

    await client.leave();
  }
}

export default AgoraRTCClient;