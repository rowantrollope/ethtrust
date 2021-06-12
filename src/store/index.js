import { reactive } from 'vue'

const state = reactive({
    mainAccount: '0x0f0d4900000000000000000400f0',
    isConnected: false,
    connectionError: "",
    balance: 0,
    trustSvc: null,
})

export default {
    state
}