import AgoraRTC, { IAgoraRTCClient, UID } from "agora-rtc-sdk-ng";
import isNil from "lodash/isNil";

interface RTC {
  client: IAgoraRTCClient;
  localAudioTrack: Nullable<any>;
  localVideoTrack: Nullable<any>;
}

class AgoraRTCClient {
  rtc: RTC;
  joined: Map<string, UID> = new Map();

  constructor() {
    this.rtc = {
      client: AgoraRTC.createClient({ mode: "live", codec: "vp8" }),
      localAudioTrack: null,
      localVideoTrack: null,
    }
  }

  createClient() {
    this.rtc.client = AgoraRTC.createClient({ mode: "live", codec: "vp8" });
  }

  async join(appId: string, channel: string, token: string | null = null) {
    const uid = await this.rtc.client?.join(appId, channel, token);
    if (!isNil(uid)) {
      this.joined.set(channel, uid);
    }
  }

  async publish({ mediaType }: { mediaType: "audio" | "video" }) {
    const { localAudioTrack, client, localVideoTrack } = this.rtc;
    if (mediaType === "audio") {
      await client.publish([localAudioTrack]);
    }
    else {
      await client.publish([localVideoTrack]);
    }
  }

  async publicAudioLocalTrack() {
    this.rtc.localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
  }

  async publicVideoLocalTrack() {
    this.rtc.localVideoTrack = await AgoraRTC.createMicrophoneAndCameraTracks();
  }

  subscribe() {
    const { client } = this.rtc;
    client.on("user-published", async (user, mediaType) => {
      await client.subscribe(user, mediaType);
      console.log("subscribe success");

      if (mediaType === "audio") {
        const remoteAudioTrack = user.audioTrack;
        remoteAudioTrack?.play();
      }
    });
  }

  unSubscribe(callback: Function) {
    const { client } = this.rtc;
    client.on("user-unpublished", user => {
      callback();
    });

  }

  async leaveCall() {
    const { localAudioTrack, client } = this.rtc;
    localAudioTrack.close();

    await client.leave();
  }
}

export default AgoraRTCClient;