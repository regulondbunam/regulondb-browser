import { gql } from 'apollo-boost';

export class GetPhrase {
    constructor(id) {
      this.id = [id.toString()]
      this.query = PHRASE_ID
    }
  }
  const PHRASE_ID = gql`
query getPharase($id: [String]!) {
  getPhraseOf(id:$id){
    objectId
    objectType
    name
    properties{
      name
      value
      pmid
      phrases{
        phrase
        phraseID
        evidence
      }
    }
  }
}
  `
