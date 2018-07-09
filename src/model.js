export class Note {
  constructor (data = {}) {
    this.id = data.id || new Date().getTime()
    this.content = data.content || ''
  }
}

export class Task {
  constructor (data = {}) {
    this.id = data.id || new Date().getTime()
    this.status = data.text || false
    this.text = data.text || ''
  }

  get isEmpty () {
    return this.text.length === 0
  }
}
