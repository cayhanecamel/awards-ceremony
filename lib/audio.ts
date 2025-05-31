import * as Tone from 'tone';

export const playDrumroll = async (): Promise<Tone.Player | null> => {
  try {
    await Tone.start();
    const player = new Tone.Player({
      url: '/sounds/drumroll.mp3',
      loop: true,
      autostart: false,
    }).toDestination();
    
    return new Promise<Tone.Player>((resolve) => {
      player.buffer.onload = () => {
        player.start();
        resolve(player);
      };
      
      if (player.buffer.loaded) {
        player.start();
        resolve(player);
      }
    });
  } catch (error) {
    console.error('ドラムロール再生エラー:', error);
    return null;
  }
};

export const stopDrumroll = (player: Tone.Player | null) => {
  if (player) {
    player.stop();
  }
};

export const playFanfare = async (): Promise<Tone.Player | null> => {
  try {
    await Tone.start();
    const player = new Tone.Player({
      url: '/sounds/fanfare.mp3',
      autostart: false,
    }).toDestination();
    
    return new Promise<Tone.Player>((resolve) => {
      player.buffer.onload = () => {
        player.start();
        resolve(player);
      };
      
      if (player.buffer.loaded) {
        player.start();
        resolve(player);
      }
    });
  } catch (error) {
    console.error('ファンファーレ再生エラー:', error);
    return null;
  }
};
