
// PortOne SDK 불러오기
import * as PortOne from "@portone/browser-sdk/v2";


// 본인인증 요청 함수 정의
export async function requestIdentityVerification() {
    try {
        const response = await PortOne.requestIdentityVerification({
            storeId: "id", // 고객사 storeId로 변경
            identityVerificationId: `identity-verification-${crypto.randomUUID()}`,
            channelKey: "channel-key-daa2e2fe-a9d4-43ff-b843-3b5e5b694f01", // 채널 키
        });

        // 본인인증 요청 후 처리 로직
        if (response.code != null) {
            alert(response.message);
        }

        // 서버에 인증 정보 전송 예시
        const verificationResult = await fetch("/identity-verifications", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                identityVerificationId: response.identityVerificationId,
            }),
        });

        const result = await verificationResult.json();

        if (result.error) {
            return alert(result.error);
        }

        alert("본인인증이 성공적으로 완료되었습니다.");
    } catch (error) {
        console.error("본인인증 요청 중 오류 발생:", error);
    }
}
