exports.Song = (class {
  constructor(post) {
    const {
        track,
        name
    } = post
    this.id = track.id;
    this.name = track.name;
  }

})
