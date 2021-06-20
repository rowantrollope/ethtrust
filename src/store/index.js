import { reactive } from 'vue'

const state = reactive({
    mainAccount: '',
    isConnected: false,
    connectionError: "",
    balance: 0,
    trustSvc: null,
})

export default {
    state
}