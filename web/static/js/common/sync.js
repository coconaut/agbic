// serializePosition :: Sprite -> Object
export const serializePosition = ({x, y}) => Object.assign({x, y})

// syncPosition :: Sprite -> Channel -> Event -> Function -> Event
export const syncPosition = (sprite, channel, event) => {
  event.add(sprite => sendPosition(sprite, channel));
  receivePosition(sprite, channel);
}

// sendPosition :: Sprite -> Channel -> Push
export const sendPosition = (sprite, channel) => {
  let message = serializePosition(sprite);
  console.log("Sending message", message);
  channel.push("position", message);
}

// receivePosition = Sprite -> Channel -> Push
export const receivePosition = (sprite, channel) => {
  let callback = (message) => {
    console.log("Received message", message);
    let {x,y} = message;
    sprite.position.setTo(x, y);
  }
  channel.on("position", callback);
}