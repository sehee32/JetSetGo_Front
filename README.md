# **JetSetGo Front​**
이 프로젝트는 Vue.js를 사용하여 항공권 검색 및 예약을 지원하는 웹 애플리케이션입니다.​


##  🛠기술 스택
- Frontend: Vue.js​ , Axios

- Backend: Spring Boot , MyBatis , MariaDB

- API: Amadeus API , Iamport



## 🚀 프로젝트 설정 및 실행
### 설치
```
npm install
```

### 실행
```
npm run serve
```

### 컴파일
```
npm run build
```



## 🌟 주요 기능

### 회원가입 (SignUp.vue)

<img width="100%" src="https://github.com/user-attachments/assets/2e6643dd-889a-4b21-8f3c-a48259e77aea"/>



<details><summary> 주요 코드
</summary>

```
<templeat>
<v-text-field
  v-model="username"
  :rules="usernameRules"
  label="ID"
  variant="outlined"
  prepend-inner-icon="mdi-account-outline"
  clearable
></v-text-field>
<v-btn @click="checkUsername">중복확인</v-btn>

<div class="phone-container">
          <v-text-field
              v-model="phoneNumber"
              :rules="phoneRules"
              id="phoneNumber"
              label="휴대전화번호"
              variant="outlined"
              prepend-inner-icon="mdi-phone-outline"
              clearable
              class="phone-text-field"
              autocomplete="off"
          ></v-text-field>
          <v-btn
              class="phone-btn"
              color="#00256c"
              size="small"
              @click="verify"
          >
            인증하기
          </v-btn>
        </div>
        <!-- 인증 메시지 -->
        <span v-if="verificationMessage" :class="{'success-message': verificationSuccess, 'error-message': !verificationSuccess}">
         {{ verificationMessage }}
        </span>
        <div>

</templeat>

<script>
methods: {
   checkUsername() {
      // 아이디 중복 확인 기능
      axios.post('http://localhost:8080/api/checkUsername', { username: this.username })
          .then(response => {
            if (response.data.exists) {
              console.log('이미 사용중인 아이디 입니다.');
              this.usernameCheckMessage = '이미 사용중인 아이디 입니다.';
              this.usernameChecked = false; // 중복된 아이디가 있는 경우 false로 설정
            } else {
              console.log('사용할 수 있는 아이디 입니다.');
              this.usernameCheckMessage = '사용할 수 있는 아이디 입니다.';
              this.usernameChecked = true; // 사용 가능한 아이디인 경우 true로 설정
            }
          })
          .catch(error => {
            console.error('아이디 중복 확인에 실패했습니다.', error);
            this.usernameCheckMessage = '아이디 중복 확인에 실패했습니다.';
            this.usernameChecked = false; // 오류 발생 시 false로 설정
          });
    },

async verify() {
      const IMP = window.IMP;
      IMP.init("imp12777257");
      try {
        IMP.certification(
            {
              // param
              pg: "inicis_unified.MIIiasTest", // 본인인증 설정이 2개 이상 되어 있는 경우 필수
              merchant_uid: "ORD20180131-0000011", // 주문 번호
            },
            function (rsp) {
              // callback
              if (rsp.success) {
                // 인증 성공 시
                console.log("인증 성공");
                this.verificationMessage = '본인 인증 요청에 성공했습니다.';
                this.verificationSuccess = true; // 인증 성공 시 변수 값을 true로 설정
              } else {
                // 인증 실패 시 로직
                console.log("본인 인증 요청 실패");
                this.verificationMessage = '본인 인증 요청에 실패했습니다.';
                this.verificationSuccess = false; // 인증 실패 시 변수 값을 false로 설정
              }
            }.bind(this) // 함수 내부에서 this를 사용할 수 있도록 바인딩
        );
      } catch (error) {
        console.error("본인 인증 요청 실패:", error);
        this.verificationMessage = '본인 인증 요청에 실패했습니다.';
        this.verificationSuccess = false; // 인증 실패 시 변수 값을 false로 설정
      }
    }
}
</script>

```
</details>


---


### 로그인 (LoginPage.vue)


<img width="100%" src="https://github.com/user-attachments/assets/8c3171b0-738e-40ac-8dfa-d8a86fc5d3c8"/>

![로그인실패](https://github.com/user-attachments/assets/d33f2f82-ffd3-4a96-ac84-a9df7ab1375d)


<details><summary>주요 코드
</summary>

```
<templeat>
<v-form
          v-model="formValid"
          @submit.prevent="submitlogin"
      >
        <v-text-field
            v-model="username"
            :readonly="loading"
            :rules="[required]"
            class="mb-2"
            label="ID"
            variant="outlined"
            prepend-inner-icon="mdi-account-outline"
            clearable
        ></v-text-field>

        <v-text-field
            v-model="password"
            :readonly="loading"
            :rules="[required]"
            :type="show ? 'text' : 'password'"
            class="mb-2"
            label="Password"
            variant="outlined"
            prepend-inner-icon="mdi-lock-outline"
            clearable
        >
          <!-- 비밀번호 표시/숨김 아이콘 -->
          <template v-slot:append-inner>
            <v-icon @click="show = !show">
              {{ show ? 'mdi-eye' : 'mdi-eye-off' }}
            </v-icon>
          </template>
        </v-text-field>
</templeat>

<script>
    async submitlogin() {
      if (!this.formValid) return;
      this.loading = true;

      try {
        // Vuex 액션 호출
        await this.login({ username: this.username, password: this.password });

        // 저장된 예약 정보가 있는지 확인
        const bookingData = this.$store.getters.getBookingData;
        if (bookingData) {
          // 예약 정보가 있으면 BookingDetail 페이지로 리다이렉트
          this.$router.push({
            name: 'BookingDetail',
            query: {
              outgoingFlight: JSON.stringify(bookingData.outgoingFlight),
              returnFlight: JSON.stringify(bookingData.returnFlight),
              adults: bookingData.adults,
              children: bookingData.children,
              travelClass: bookingData.travelClass,
              totalPrice: bookingData.totalPrice
            }
          });
          // 사용한 예약 정보 초기화
          this.$store.commit('clearBookingData');
        } else {
          // 예약 정보가 없으면 메인 페이지로 이동
          this.$router.push('/');
        }
      } catch (error) {
        console.error('로그인 오류:', error);
        alert('아이디 또는 비밀번호를 확인해주세요.');
      } finally {
        this.loading = false;
      }
    }
</script>
```
</details>


---


### 마이페이지

![마이페이지1](https://github.com/user-attachments/assets/fbee741d-ca44-44ae-b6f3-df2975876c81)
![마이페이지2](https://github.com/user-attachments/assets/eba02992-1498-4f94-916a-a1975b06111f)
![마이페이지3](https://github.com/user-attachments/assets/ec963116-9217-4590-ae30-e3e0f5917d31)
![마이페이지4](https://github.com/user-attachments/assets/608e08dd-5d70-4b35-b28c-7166470a92ab)
![마이페이지5](https://github.com/user-attachments/assets/e44f1bce-945a-4599-af6e-c09fd8ba973f)


<details><summary> 주요코드
</summary>

```
코드
```
</details>

---

### 문의하기

![문의1](https://github.com/user-attachments/assets/325b43eb-451f-4307-a074-3cb5ae321efc)
![문의2](https://github.com/user-attachments/assets/f961cbfd-5d98-4b84-9502-703d30f1268d)



<details><summary> 주요코드
</summary>

```
코드
```
</details>

---

### 항공권 조회

![검색1](https://github.com/user-attachments/assets/cb1916d4-748e-4e83-9558-75f7dd1c3525)
![검색2](https://github.com/user-attachments/assets/5fb531ee-abea-4b05-b9e0-82a69e4321ee)
![검색3](https://github.com/user-attachments/assets/6a56866f-de94-44ce-a3b8-7d3e5a5d160d)
![검색4](https://github.com/user-attachments/assets/cecc9d71-6576-422f-b5dc-fbba00b14374)


<details><summary> 주요코드
</summary>

```
코드
```
</details>

---

### 항공권 예매

![예매1](https://github.com/user-attachments/assets/1cfc4cb1-061a-4dbd-abd0-8b853690ec80)


<details><summary> 주요코드
</summary>

```
코드
```
</details>

---

### 항공권 결제

![결제1](https://github.com/user-attachments/assets/06af637d-71de-4e83-9d6a-2aabfecc6507)



<details><summary> 주요코드
</summary>

```
코드
```
</details>
