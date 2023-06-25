import { defineStore } from 'pinia'
import { getResponse } from '../api/openAi'


interface Store {
  response: string
}

export const openAiStore = defineStore({
    id: 'openAi',
    state: (): Store => ({
    response:''
    }),
    actions: {
        async getResponse(prompt: string) {
            const response = await getResponse(prompt)
            this.response = response.data.choices[0].text.trim()
        }
    }
})
