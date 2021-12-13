import axios from 'axios';
import Constants from "../common/constants"

const TEXT_TO_SPEECH_API_URL = 'https://texttospeech.googleapis.com/v1beta1/text:synthesize?key=' + Constants.API_KEY

class TextToSpeechService{
    postText(str, languageCode){
        return axios.post(
            TEXT_TO_SPEECH_API_URL,
            {
                "input": {
                  "text": str
                },
                "voice": {
                  "languageCode": languageCode
                },
                "audioConfig": {
                  "audioEncoding": "MP3"
                }
            }
        )
    }
}

export default new TextToSpeechService();