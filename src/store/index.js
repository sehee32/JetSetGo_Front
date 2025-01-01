import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
    state() {
        return {
            token: localStorage.getItem('jwtToken') || '',
            user: {}, // 사용자 정보 저장
            bookingData: null   // 예약 정보 저장
        };
    },
    mutations: {
        setToken(state, token) {
            state.token = token;
            localStorage.setItem('jwtToken', token);
        },
        clearToken(state) {
            state.token = '';
            localStorage.removeItem('jwtToken');
        },
        setUser(state, user) {
            state.user = user;
        },
        setBookingData(state, data) {
            state.bookingData = data;
        },
        clearBookingData(state) {
            state.bookingData = null;
        }
    },
    actions: {
        async login({ commit }, { username, password }) {
            try {
                const response = await axios.post('/api/login', { username, password });
                const token = response.data.token;
                commit('setToken', token);
                return token;
            } catch (error) {
                console.error('로그인 오류:', error);
                throw error;
            }
        },
        logout({ commit }) {
            commit('clearToken');
            commit('clearBookingData')
        },
        saveBookingData({commit}, bookingData) {
            commit('setBookingData', bookingData);
        }
    },
    getters: {
        isAuthenticated(state) {
            return !!state.token;
        },
        getBookingData(state) {
            return state.bookingData;
        }
    }
});
