import { reactive } from 'vue'
import TrustService from '../TrustService'

const state = reactive({
    ts: new TrustService,
})

export default {
    state
}