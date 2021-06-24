import { reactive } from 'vue'
import TrustService from '../libs/TrustService'

const state = reactive({
    ts: new TrustService,
})

export default {
    state
}