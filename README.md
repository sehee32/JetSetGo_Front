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

<img width="100%" src="https://github-production-user-asset-6210df.s3.amazonaws.com/204322966/427904124-6be34c7f-40f4-4078-8aa7-f024e003df8d.PNG?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVCODYLSA53PQK4ZA%2F20250328%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250328T074813Z&X-Amz-Expires=300&X-Amz-Signature=db3be1788f90d278ab919282100bbc168f23be2ba5e204f44864e9eeca1c955a&X-Amz-SignedHeaders=host"/>


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

<img width="100%" src="https://github-production-user-asset-6210df.s3.amazonaws.com/204322966/427910383-48994561-9880-4b15-9c8b-ba5cff9fb294.gif?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVCODYLSA53PQK4ZA%2F20250328%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250328T075849Z&X-Amz-Expires=300&X-Amz-Signature=e4fc3a972ec8a3feafad3056f5a9dd309321fc8ff436ee32af69cb751b24f3bb&X-Amz-SignedHeaders=host"/>


<img width="100%" src="https://github-production-user-asset-6210df.s3.amazonaws.com/204322966/427911684-ac2cb468-98b4-442f-bb46-52ee2f559ee4.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVCODYLSA53PQK4ZA%2F20250328%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250328T080124Z&X-Amz-Expires=300&X-Amz-Signature=83d1ce080371bfd1bb685c3afcf979ef5551c8a94af5e99776451aef6683e8e1&X-Amz-SignedHeaders=host"/>



<img width="100%" src="https://github-production-user-asset-6210df.s3.amazonaws.com/204322966/427913152-a2339b0f-0c9f-4365-9941-8c64957c6722.gif?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVCODYLSA53PQK4ZA%2F20250328%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250328T080450Z&X-Amz-Expires=300&X-Amz-Signature=11d36ab31700276909769630552ab63f6eefa1e6617f198b3e086ba35527261d&X-Amz-SignedHeaders=host"/>


<img width="100%" src=""/>

<details><summary> 주요코드
</summary>

```
코드
```
</details>

---

### 문의하기

<img width="100%" src=""/>
<img width="100%" src=""/>
<img width="100%" src=""/>
<img width="100%" src=""/>


<details><summary> 주요코드
</summary>

```
코드
```
</details>

---

### 항공권 조회

<img width="100%" src=""/>
<img width="100%" src=""/>
<img width="100%" src=""/>
<img width="100%" src=""/>
<img width="100%" src=""/>

<details><summary> 주요코드
</summary>

```
코드
```
</details>

---

### 항공권 예매

<img width="100%" src=""/>
<img width="100%" src=""/>
<img width="100%" src=""/>
<img width="100%" src=""/>
<img width="100%" src=""/>
<img width="100%" src=""/>

<details><summary> 주요코드
</summary>

```
코드
```
</details>

---

### 항공권 결제

<img width="100%" src=""/>
<img width="100%" src=""/>
<img width="100%" src=""/>
<img width="100%" src=""/>
<img width="100%" src=""/>


<details><summary> 주요코드
</summary>

```
코드
```
</details>
