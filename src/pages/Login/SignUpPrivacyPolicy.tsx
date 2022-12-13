/* eslint-disable react/no-unescaped-entities */
import Button from '@/components/Button';
import { ReactComponent as CloseIcon } from '@/assets/icon/close_icon.svg';

type PolicyModalProps = {
  onClose: () => void;
  onConfirm: () => void;
};

export default function SignUpPrivacyPolicy({ onClose, onConfirm }: PolicyModalProps) {
  return (
    <div className="fixed top-0 mx-auto  z-[1000] max-w-[425px] w-full h-screen bg-[#00000030] flex flex-col items-center justify-center">
      <div className="relative bg-white w-full h-full block overflow-y-auto">
        <div className="bg-white shadow-sm flex justify-between items-center p-2 sticky top-0">
          <div className="flex items-center space-x-1">
            <button onClick={onClose}>
              <CloseIcon stroke="#222222" className="h-6 aspect-square" />
            </button>
            <h3 className="mx-0 px-0">개인정보 처리방침</h3>
          </div>
          <Button
            type="button"
            label="전체 동의"
            width="small"
            className="text-label leading-5"
            onClick={onConfirm}
          />
        </div>
        <hr className="py-1" />
        <div className="bg-white px-2">
          <p className="ls2 lh6 bs5 ts4">
            <em className="emphasis">&lt; 핑크덤벨 &gt;('https://petalog.kr'이하 '펫탈로그')</em>
            은(는) 「개인정보 보호법」 제30조에 따라 정보주체의 개인정보를 보호하고 이와 관련한
            고충을 신속하고 원활하게 처리할 수 있도록 하기 위하여 다음과 같이 개인정보 처리방침을
            수립·공개합니다.
          </p>
          <p className="ls2">
            ○ 이 개인정보처리방침은 <em className="emphasis">2022</em>년{' '}
            <em className="emphasis">10</em>월 <em className="emphasis">10</em>부터 적용됩니다.
          </p>
          <br />
          <p className="lh6 bs4">
            <strong>
              제1조(개인정보의 처리 목적)
              <br />
              <br />
              <em className="emphasis">&lt; 핑크덤벨 &gt;('https://petalog.kr'이하 '펫탈로그')</em>
              은(는) 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의
              목적 이외의 용도로는 이용되지 않으며 이용 목적이 변경되는 경우에는 「개인정보 보호법」
              제18조에 따라 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.
            </strong>
          </p>
          <ul className="list_indent2 mgt10">
            <p className="ls2">1. 홈페이지 회원가입 및 관리</p>
            <p className="ls2">
              회원 가입의사 확인, 회원자격 유지·관리, 서비스 부정이용 방지 목적으로 개인정보를
              처리합니다.
            </p>
            <br />
            <p className="ls2">2. 재화 또는 서비스 제공</p>
            <p className="ls2">
              서비스 제공, 콘텐츠 제공, 맞춤서비스 제공을 목적으로 개인정보를 처리합니다.
            </p>
            <br />
          </ul>
          <br />
          <br />
          <p className="lh6 bs4">
            <strong>제2조(개인정보의 처리 및 보유 기간)</strong>
            <br />
            <br />① <em className="emphasis">&lt; 핑크덤벨 &gt;</em>은(는) 법령에 따른 개인정보
            보유·이용기간 또는 정보주체로부터 개인정보를 수집 시에 동의받은 개인정보 보유·이용기간
            내에서 개인정보를 처리·보유합니다.
            <br />
            <br />② 각각의 개인정보 처리 및 보유 기간은 다음과 같습니다.
          </p>
          <ul className="list_indent2 mgt10">
            <li className="tt">1.&lt;홈페이지 회원가입 및 관리&gt;</li>
            <li className="tt">
              &lt;홈페이지 회원가입 및 관리&gt;와 관련한 개인정보는 수집.이용에 관한
              동의일로부터&lt;지체없이 파기&gt;까지 위 이용목적을 위하여 보유.이용됩니다.
            </li>
            <li>보유근거 : 서비스 이용 회원을 관리하기 위한 정보를 보유합니다.</li>
            <li>관련법령 : </li>
            <li>예외사유 : </li>
          </ul>
          <ul className="list_indent2 mgt10">
            <li className="tt">2.&lt;재화 또는 서비스 제공&gt;</li>
            <li className="tt">
              &lt;재화 또는 서비스 제공&gt;와 관련한 개인정보는 수집.이용에 관한
              동의일로부터&lt;지체없이 파기&gt;까지 위 이용목적을 위하여 보유.이용됩니다.
            </li>
            <li>보유근거 : 맞춤 서비스 및 기능을 제공하기 위한 정보를 보유합니다.</li>
            <li>관련법령 : </li>
            <li>예외사유 : </li>
          </ul>
          <br />
          <br />
          <p className="lh6 bs4">
            <strong>제3조(처리하는 개인정보의 항목) </strong>
            <br />
            <br /> ① <em className="emphasis">&lt; 핑크덤벨 &gt;</em>은(는) 다음의 개인정보 항목을
            처리하고 있습니다.
          </p>
          <ul className="list_indent2 mgt10">
            <li className="tt">1&lt; 홈페이지 회원가입 및 관리 &gt;</li>
            <li>
              필수항목 : 비밀번호, 로그인ID, 이름, 서비스 이용 기록, 접속 로그, 쿠키, 접속 IP 정보
            </li>
            <li>선택항목 : </li>
          </ul>
          <br />
          <br />
          <p className="lh6 bs4">
            <strong>제4조(개인정보의 제3자 제공에 관한 사항)</strong>
            <br />
            <br /> ①{' '}
            <em className="emphasis">
              &lt; 핑크덤벨 &gt;은(는) 개인정보를 제1조(개인정보의 처리 목적)에서 명시한 범위
              내에서만 처리하며, 정보주체의 동의, 법률의 특별한 규정 등 「개인정보 보호법」 제17조
              및 제18조에 해당하는 경우에만 개인정보를 제3자에게 제공합니다.
            </em>
          </p>
          <p className="sub_p mgt10">
            <em className="emphasis">
              ② <span className="colorLightBlue">&lt; 핑크덤벨 &gt;</span>은(는) 다음과 같이
              개인정보를 제3자에게 제공하고 있습니다.
            </em>
          </p>
          <ul className="list_indent2 mgt10">
            <li className="tt">
              <em className="emphasis">1. &lt; &gt;</em>
            </li>
            <li>
              <em className="emphasis">개인정보를 제공받는 자 : </em>
            </li>
            <li>
              <em className="emphasis">제공받는 자의 개인정보 이용목적 : </em>
            </li>
            <li>
              <em className="emphasis">제공받는 자의 보유.이용기간: </em>
            </li>
          </ul>
          <em className="emphasis" />
          <br />
          <br />
          <p className="lh6 bs4">
            <strong>제5조(개인정보처리의 위탁에 관한 사항)</strong>
            <br />
            <br /> ① <em className="emphasis">&lt; 핑크덤벨 &gt;</em>은(는) 원활한 개인정보
            업무처리를 위하여 다음과 같이 개인정보 처리업무를 위탁하고 있습니다.
          </p>
          <ul className="list_indent2 mgt10">
            <li className="tt">1. &lt; &gt;</li>
            <li>위탁받는 자 (수탁자) : </li>
            <li>위탁하는 업무의 내용 : </li>
            <li>위탁기간 : </li>
          </ul>
          <p className="sub_p mgt10">
            ② <span className="colorLightBlue">&lt; 핑크덤벨 &gt;</span>은(는) 위탁계약 체결시
            「개인정보 보호법」 제26조에 따라 위탁업무 수행목적 외 개인정보 처리금지, 기술적․관리적
            보호조치, 재위탁 제한, 수탁자에 대한 관리․감독, 손해배상 등 책임에 관한 사항을 계약서 등
            문서에 명시하고, 수탁자가 개인정보를 안전하게 처리하는지를 감독하고 있습니다.
          </p>
          <p className="sub_p mgt10">
            ③ 위탁업무의 내용이나 수탁자가 변경될 경우에는 지체없이 본 개인정보 처리방침을 통하여
            공개하도록 하겠습니다.
          </p>
          <br />
          <br />
          <p className="lh6 bs4">
            <strong>
              제6조(개인정보의 파기절차 및 파기방법)<em className="emphasis"></em>
            </strong>
          </p>
          <p className="ls2">
            <em className="emphasis">
              <br />① &lt; 핑크덤벨 &gt; 은(는) 개인정보 보유기간의 경과, 처리목적 달성 등
              개인정보가 불필요하게 되었을 때에는 지체없이 해당 개인정보를 파기합니다.
              <br />
              <br />② 정보주체로부터 동의받은 개인정보 보유기간이 경과하거나 처리목적이
              달성되었음에도 불구하고 다른 법령에 따라 개인정보를 계속 보존하여야 하는 경우에는,
              해당 개인정보를 별도의 데이터베이스(DB)로 옮기거나 보관장소를 달리하여 보존합니다.
              <br />
              1. 법령 근거 :<br />
              2. 보존하는 개인정보 항목 : 계좌정보, 거래날짜
              <br />
              <br />③ 개인정보 파기의 절차 및 방법은 다음과 같습니다.
              <br />
              1. 파기절차
              <br /> &lt; 핑크덤벨 &gt; 은(는) 파기 사유가 발생한 개인정보를 선정하고, &lt; 핑크덤벨
              &gt; 의 개인정보 보호책임자의 승인을 받아 개인정보를 파기합니다.
              <br />
            </em>
          </p>
          <p className="sub_p mgt10">
            <em className="emphasis">2. 파기방법</em>
          </p>
          <p className="sub_p">
            <em className="emphasis">
              전자적 파일 형태의 정보는 기록을 재생할 수 없는 기술적 방법을 사용합니다
            </em>
          </p>
          <em className="emphasis" />
          <br />
          <br />
          <p className="lh6 bs4">
            <strong>제7조(미이용자의 개인정보 파기 등에 관한 조치)</strong>
          </p>
          <p className="ls2">
            <br />
            <br />① &lt;개인정보처리자명&gt;은(는) 1년간 서비스를 이용하지 않은 이용자의 정보를
            파기하고 있습니다. 다만, 다른 법령에서 정한 보존기간이 경과할 때까지 다른 이용자의
            개인정보와 분리하여 별도로 저장·관리할 수 있습니다.
            <br />② &lt;개인정보처리자명&gt;은(는) 개인정보의 파기 30일 전까지 개인정보가 파기되는
            사실, 기간 만료일 및 파기되는 개인정보의 항목을 이메일, 문자 등 이용자에게 통지 가능한
            방법으로 알리고 있습니다.
            <br />③ 개인정보의 파기를 원하지 않으시는 경우, 기간 만료 전 서비스 로그인을 하시면
            됩니다.
            <br />
            <br />
          </p>
          <p className="lh6 bs4">
            <strong>제8조(정보주체와 법정대리인의 권리·의무 및 그 행사방법에 관한 사항)</strong>
          </p>
          <p className="ls2">
            <br />
            <br />① 정보주체는 핑크덤벨에 대해 언제든지 개인정보 열람·정정·삭제·처리정지 요구 등의
            권리를 행사할 수 있습니다.
          </p>
          <p className="sub_p">
            ② 제1항에 따른 권리 행사는핑크덤벨에 대해 「개인정보 보호법」 시행령 제41조제1항에 따라
            서면, 전자우편, 모사전송(FAX) 등을 통하여 하실 수 있으며 핑크덤벨은(는) 이에 대해 지체
            없이 조치하겠습니다.
          </p>
          <p className="sub_p">
            ③ 제1항에 따른 권리 행사는 정보주체의 법정대리인이나 위임을 받은 자 등 대리인을 통하여
            하실 수 있습니다.이 경우 “개인정보 처리 방법에 관한 고시(제2020-7호)” 별지 제11호 서식에
            따른 위임장을 제출하셔야 합니다.
          </p>
          <p className="sub_p">
            ④ 개인정보 열람 및 처리정지 요구는 「개인정보 보호법」 제35조 제4항, 제37조 제2항에
            의하여 정보주체의 권리가 제한 될 수 있습니다.
          </p>
          <p className="sub_p">
            ⑤ 개인정보의 정정 및 삭제 요구는 다른 법령에서 그 개인정보가 수집 대상으로 명시되어 있는
            경우에는 그 삭제를 요구할 수 없습니다.
          </p>
          <p className="sub_p">
            ⑥ 핑크덤벨은(는) 정보주체 권리에 따른 열람의 요구, 정정·삭제의 요구, 처리정지의 요구 시
            열람 등 요구를 한 자가 본인이거나 정당한 대리인인지를 확인합니다.
          </p>
          <br />
          <br />
          <p className="lh6 bs4">
            <strong>
              제9조(개인정보의 안전성 확보조치에 관한 사항)
              <em className="emphasis">
                <br />
                <br />
                &lt; 핑크덤벨 &gt;
              </em>
              은(는) 개인정보의 안전성 확보를 위해 다음과 같은 조치를 취하고 있습니다.
            </strong>
          </p>
          <p className="sub_p mgt10">
            1. 개인정보 취급 직원의 최소화 및 교육
            <br /> 개인정보를 취급하는 직원을 지정하고 담당자에 한정시켜 최소화 하여 개인정보를
            관리하는 대책을 시행하고 있습니다.
            <br />
            <br />
            2. 내부관리계획의 수립 및 시행
            <br /> 개인정보의 안전한 처리를 위하여 내부관리계획을 수립하고 시행하고 있습니다.
            <br />
            <br />
            3. 개인정보의 암호화
            <br /> 이용자의 개인정보는 비밀번호는 암호화 되어 저장 및 관리되고 있어, 본인만이 알 수
            있으며 중요한 데이터는 파일 및 전송 데이터를 암호화 하거나 파일 잠금 기능을 사용하는
            등의 별도 보안기능을 사용하고 있습니다.
            <br />
            <br />
            4. 개인정보에 대한 접근 제한
            <br /> 개인정보를 처리하는 데이터베이스시스템에 대한 접근권한의 부여,변경,말소를 통하여
            개인정보에 대한 접근통제를 위하여 필요한 조치를 하고 있으며 침입차단시스템을 이용하여
            외부로부터의 무단 접근을 통제하고 있습니다.
            <br />
            <br />
            5. 문서보안을 위한 잠금장치 사용
            <br /> 개인정보가 포함된 서류, 보조저장매체 등을 잠금장치가 있는 안전한 장소에 보관하고
            있습니다.
            <br />
            <br />
            6. 비인가자에 대한 출입 통제
            <br /> 개인정보를 보관하고 있는 물리적 보관 장소를 별도로 두고 이에 대해 출입통제 절차를
            수립, 운영하고 있습니다.
            <br />
            <br />
          </p>
          <br />
          <br />
          <p className="lh6 bs4">
            <strong>
              제10조(개인정보를 자동으로 수집하는 장치의 설치·운영 및 그 거부에 관한 사항)
            </strong>
          </p>
          <p className="ls2">
            <br />
            <br />
            핑크덤벨 은(는) 정보주체의 이용정보를 저장하고 수시로 불러오는 ‘쿠키(cookie)’를 사용하지
            않습니다.
            <br />
            <br />
          </p>
          <p className="lh6 bs4">
            <strong>제11조(행태정보의 수집·이용·제공 및 거부 등에 관한 사항)</strong>
          </p>
          <p className="ls2">
            <br />
            <br />① &lt;개인정보처리자&gt;은(는) 서비스 이용과정에서 정보주체에게 최적화된 맞춤형
            서비스 및 혜택, 온라인 맞춤형 광고 등을 제공하기 위하여 행태정보를 수집·이용하고
            있습니다.
          </p>
          <p className="sub_p">② &lt;개인정보처리자&gt;은(는) 다음과 같이 행태정보를 수집합니다.</p>
          <table className="tb_board td_border_all tb_board_view tb_row mgt10">
            <caption>
              11. 행태정보의 수집·이용·제공 및 거부 등에 관한 사항 제공을 위해 수집하는 행태정보의
              항목, 행태정보 수집 방법, 행태정보 수집 목적, 보유·이용기간 및 이후 정보처리 방법을
              입력하기 위한 표입니다.
            </caption>
            <colgroup>
              <col width="auto" />
              <col width="auto" />
              <col width="auto" />
              <col width="auto" />
            </colgroup>
            <tbody>
              <tr>
                <th scope="row" className="bdl">
                  수집하는 행태정보의 항목
                </th>
                <th scope="row" className="bdl">
                  행태정보 수집 방법
                </th>
                <th scope="row" className="bdl">
                  행태정보 수집 목적
                </th>
                <th scope="row" className="bdl">
                  보유·이용기간 및 이후 정보처리 방법
                </th>
              </tr>
              <tr>
                <td className="txtc">
                  이용자의 웹/앱 접속 기록, 이용자의 반려동물 생활 기록(산책 기록 위치 정보, 급여
                  정보 등), 이용자의 반려동물 기초 정보(종, 나이, 성별, 특성 등)
                </td>
                <td className="txtc">
                  이용자의 웹/앱 접속 시 접속 기록 자동 저장, 이용자의 생활 기록 기능 중 산책 기록
                  기능 사용 시 위치정보 기록
                </td>
                <td className="txtc">
                  이용자에게 맞춤 상품 추천 및 생활 기록 관리 기능 제공을 위함
                </td>
                <td className="txtc">회원탈퇴 시 즉시 파기</td>
              </tr>
            </tbody>
          </table>
          <div className="panel_box panel_white">
            &lt;온라인 맞춤형 광고 등을 위해 제3자(온라인 광고사업자 등)가 이용자의 행태정보를
            수집·처리할수 있도록 허용한 경우&gt;<p></p>
            <p className="sub_p">
              ③ &lt;개인정보처리자&gt;은(는) 다음과 같이 온라인 맞춤형 광고 사업자가 행태정보를
              수집·처리하도록 허용하고 있습니다.
            </p>
            <p className="sub_p">- 행태정보를 수집 및 처리하려는 광고 사업자 : 없음</p>
            <p className="sub_p">
              - 행태정보 수집 방법 : 이용자가 당사 웹사이트를 방문하거나 앱을 실행할 때 자동 수집 및
              전송
            </p>
            <p className="sub_p">
              - 수집·처리되는 행태정보 항목 : 이용자의 웹/앱 방문이력, 검색이력
            </p>
            <p className="sub_p">- 보유·이용기간 : 즉시 파기</p>
            <p className="sub_p"></p>
          </div>
          ④ &lt;개인정보처리자&gt;은(는) 온라인 맞춤형 광고 등에 필요한 최소한의 행태정보만을
          수집하며, 사상, 신념, 가족 및 친인척관계, 학력·병력, 기타 사회활동 경력 등 개인의
          권리·이익이나 사생활을 뚜렷하게 침해할 우려가 있는 민감한 행태정보를 수집하지 않습니다.
          <p></p>
          <p className="sub_p">
            ⑤ &lt;개인정보처리자&gt;은(는) 만 14세 미만임을 알고 있는 아동이나 만14세 미만의 아동을
            주 이용자로 하는 온라인 서비스로부터 맞춤형 광고 목적의 행태정보를 수집하지 않고, 만
            14세 미만임을 알고 있는 아동에게는 맞춤형 광고를 제공하지 않습니다.
          </p>
          <p className="sub_p">
            ⑥ &lt;개인정보처리자&gt;은(는) 모바일 앱에서 온라인 맞춤형 광고를 위하여 광고식별자를
            수집·이용합니다. 정보주체는 모바일 단말기의 설정 변경을 통해 앱의 맞춤형 광고를
            차단·허용할 수 있습니다.
          </p>
          <p className="sub_p">‣ 스마트폰의 광고식별자 차단/허용</p>
          <p className="sub_p">
            (1) (안드로이드) ① 설정 → ② 개인정보보호 → ③ 광고 → ③ 광고 ID 재설정 또는 광고ID 삭제
          </p>
          <p className="sub_p">
            (2) (아이폰) ① 설정 → ② 개인정보보호 → ③ 추적 → ④ 앱이 추적을 요청하도록 허용 끔
          </p>
          <p className="sub_p">※ 모바일 OS 버전에 따라 메뉴 및 방법이 다소 상이할 수 있습니다.</p>
          <p className="sub_p">
            ⑦ 정보주체는 웹브라우저의 쿠키 설정 변경 등을 통해 온라인 맞춤형 광고를 일괄적으로
            차단·허용할 수 있습니다. 다만, 쿠키 설정 변경은 웹사이트 자동로그인 등 일부 서비스의
            이용에 영향을 미칠 수 있습니다.
          </p>
          <p className="sub_p">‣ 웹브라우저를 통한 맞춤형 광고 차단/허용</p>
          <p className="sub_p">(1) 인터넷 익스플로러(Windows 10용 Internet Explorer 11)</p>
          <p className="sub_p">
            - Internet Explorer에서 도구 버튼을 선택한 다음 인터넷 옵션을 선택
          </p>
          <p className="sub_p">
            - 개인 정보 탭을 선택하고 설정에서 고급을 선택한 다음 쿠키의 차단 또는 허용을 선택
          </p>
          <p className="sub_p">(2) Microsoft Edge</p>
          <p className="sub_p">- Edge에서 오른쪽 상단 ‘…’ 표시를 클릭한 후, 설정을 클릭합니다.</p>
          <p className="sub_p">
            - 설정 페이지 좌측의 ‘개인정보, 검색 및 서비스’를 클릭 후 「추적방지」 섹션에서
            ‘추적방지’ 여부 및 수준을 선택합니다.
          </p>
          <p className="sub_p">
            - ‘InPrivate를 검색할 때 항상 ""엄격"" 추적 방지 사용’ 여부를 선택합니다.
          </p>
          <p className="sub_p">
            - 아래 「개인정보」 섹션에서 ‘추적 안함 요청보내기’ 여부를 선택합니다.
          </p>
          <p className="sub_p">(3) 크롬 브라우저</p>
          <p className="sub_p">
            - Chrome에서 오른쪽 상단 ‘⋮’ 표시(chrome 맞춤설정 및 제어)를 클릭한 후, 설정 표시를
            클릭합니다.
          </p>
          <p className="sub_p">
            - 설정 페이지 하단에 ‘고급 설정 표시’를 클릭하고 「개인정보」 섹션에서 콘텐츠 설정을
            클릭합니다.
          </p>
          <p className="sub_p">
            - 쿠키 섹션에서 ‘타사 쿠키 및 사이트 데이터 차단’의 체크박스를 선택합니다.
          </p>
          <p className="sub_p">52 | 개인정보 처리방침 작성지침 일반</p>
          <p className="sub_p">
            ⑧ 정보주체는 아래의 연락처로 행태정보와 관련하여 궁금한 사항과 거부권 행사, 피해 신고
            접수 등을 문의할 수 있습니다.
          </p>
          <p className="sub_p">‣ 개인정보 보호 담당부서</p>
          <p className="sub_p">부서명 : 개발/운영 팀</p>
          <p className="sub_p">담당자 : 은승균</p>
          <p className="sub_p">연락처 : 010-8192-5262, dmstmdrbs98@gmail.com</p>
          <br />
          <br />
          <p className="lh6 bs4">
            <strong>
              제12조(추가적인 이용·제공 판단기준)<em className="emphasis"></em>
            </strong>
            <em className="emphasis">
              <br />
              <br />
              &lt; 핑크덤벨 &gt; 은(는) ｢개인정보 보호법｣ 제15조제3항 및 제17조제4항에 따라
              ｢개인정보 보호법 시행령｣ 제14조의2에 따른 사항을 고려하여 정보주체의 동의 없이
              개인정보를 추가적으로 이용·제공할 수 있습니다.
              <br /> 이에 따라 &lt; 핑크덤벨 &gt; 가(이) 정보주체의 동의 없이 추가적인 이용·제공을
              하기 위해서 다음과 같은 사항을 고려하였습니다.
              <br />▶ 개인정보를 추가적으로 이용·제공하려는 목적이 당초 수집 목적과 관련성이 있는지
              여부
            </em>
          </p>
          <p className="sub_p"></p>
          <p className="sub_p"></p>
          <p className="sub_p">
            <em className="emphasis">
              ▶ 개인정보를 수집한 정황 또는 처리 관행에 비추어 볼 때 추가적인 이용·제공에 대한 예측
              가능성이 있는지 여부
            </em>
          </p>
          <p className="sub_p"></p>
          <p className="sub_p"></p>
          <p className="sub_p">
            <em className="emphasis">
              ▶ 개인정보의 추가적인 이용·제공이 정보주체의 이익을 부당하게 침해하는지 여부
            </em>
          </p>
          <p className="sub_p"></p>
          <p className="sub_p"></p>
          <p className="sub_p">
            <em className="emphasis">
              ▶ 가명처리 또는 암호화 등 안전성 확보에 필요한 조치를 하였는지 여부
            </em>
          </p>
          <p className="sub_p"></p>
          <p className="sub_p"></p>
          <p className="sub_p"></p>
          <p className="sub_p"></p>
          <p className="sub_p"></p>
          <p className="sub_p">
            <em className="emphasis">
              ※ 추가적인 이용·제공 시 고려사항에 대한 판단기준은 사업자/단체 스스로 자율적으로
              판단하여 작성·공개함
            </em>
          </p>
          <em className="emphasis" />
          <br />
          <br />
          <p className="lh6 bs4">
            <strong>제13조(가명정보를 처리하는 경우 가명정보 처리에 관한 사항)</strong>
          </p>
          <p className="sub_p mgt30">
            <strong>제14조 (개인정보 보호책임자에 관한 사항) </strong>
          </p>
          <p className="sub_p mgt10">
            <strong>
              <em className="emphasis">
                {' '}
                ① <span className="colorLightBlue">핑크덤벨</span> 은(는) 개인정보 처리에 관한
                업무를 총괄해서 책임지고, 개인정보 처리와 관련한 정보주체의 불만처리 및 피해구제
                등을 위하여 아래와 같이 개인정보 보호책임자를 지정하고 있습니다.
              </em>
            </strong>
          </p>
          <ul className="list_indent2 mgt10">
            <li className="tt">
              <strong>
                <em className="emphasis">▶ 개인정보 보호책임자 </em>
              </strong>
            </li>
            <li>
              <strong>
                <em className="emphasis">성명 :은승균</em>
              </strong>
            </li>
            <li>
              <strong>
                <em className="emphasis">직책 :대표</em>
              </strong>
            </li>
            <li>
              <strong>
                <em className="emphasis">직급 :대표</em>
              </strong>
            </li>
            <li>
              <strong>
                <em className="emphasis">연락처 :010-8192-5262, dmstmdrbs98@gmail.com, </em>
              </strong>
            </li>
          </ul>
          <p className="sub_p">
            <strong>
              <em className="emphasis">※ 개인정보 보호 담당부서로 연결됩니다.</em>
            </strong>
          </p>
          <p>
            <strong>
              <em className="emphasis"> </em>
            </strong>
          </p>
          <ul className="list_indent2 mgt10">
            <li className="tt">
              <strong>
                <em className="emphasis">▶ 개인정보 보호 담당부서</em>
              </strong>
            </li>
            <li>
              <strong>
                <em className="emphasis">부서명 :개발/운영</em>
              </strong>
            </li>
            <li>
              <strong>
                <em className="emphasis">담당자 :은승균</em>
              </strong>
            </li>
            <li>
              <strong>
                <em className="emphasis">연락처 :010-8192-5262, dmstmdrbs98@gmail.com, </em>
              </strong>
            </li>
          </ul>
          <p className="sub_p">
            <strong>
              <em className="emphasis">
                ② 정보주체께서는 핑크덤벨 의 서비스(또는 사업)을 이용하시면서 발생한 모든 개인정보
                보호 관련 문의, 불만처리, 피해구제 등에 관한 사항을 개인정보 보호책임자 및
                담당부서로 문의하실 수 있습니다. 핑크덤벨 은(는) 정보주체의 문의에 대해 지체 없이
                답변 및 처리해드릴 것입니다.
              </em>
            </strong>
          </p>
          <strong>
            <em className="emphasis">
              <br />
              <br />
              <p className="lh6 bs4">
                <strong>
                  제15조(국내대리인의 지정)
                  <em className="emphasis">
                    <br />
                    <br />
                    정보주체는 ｢개인정보 보호법｣ 제39조의11에 따라 지정된 &lt; 핑크덤벨 &gt;의
                    국내대리인에게 개인정보 관련 고충처리 등의 업무를 위하여 연락을 취할 수
                    있습니다. &lt; 핑크덤벨 &gt;은(는) 정보주체의 개인정보 관련 고충처리 등 개인정보
                    보호책임자의 업무 등을 신속하게 처리할 수 있도록 노력하겠습니다. <br />
                    <br />
                  </em>
                </strong>
              </p>
              <p className="sub_p mgt30">
                <strong>
                  <em className="emphasis">
                    <strong>
                      제16조(개인정보의 열람청구를 접수·처리하는 부서)
                      <br /> 정보주체는 ｢개인정보 보호법｣ 제35조에 따른 개인정보의 열람 청구를
                      아래의 부서에 할 수 있습니다.
                      <br />
                      &lt; 핑크덤벨 &gt;은(는) 정보주체의 개인정보 열람청구가 신속하게 처리되도록
                      노력하겠습니다.{' '}
                    </strong>
                  </em>
                </strong>
              </p>
              <ul className="list_indent2 mgt10">
                <li className="tt">
                  <strong>
                    <em className="emphasis">▶ 개인정보 열람청구 접수·처리 부서 </em>
                  </strong>
                </li>
                <li>
                  <strong>
                    <em className="emphasis">부서명 : 개발/운영</em>
                  </strong>
                </li>
                <li>
                  <strong>
                    <em className="emphasis">담당자 : 은승균</em>
                  </strong>
                </li>
                <li>
                  <strong>
                    <em className="emphasis">연락처 : 010-8192-5262, dmstmdrbs98@gmail.com, </em>
                  </strong>
                </li>
              </ul>
              <strong>
                <em className="emphasis">
                  <br />
                  <br />
                  <p className="lh6 bs4">
                    <strong>
                      제17조(정보주체의 권익침해에 대한 구제방법)<em className="emphasis"></em>
                    </strong>
                  </p>
                  <br />
                  <br />
                  정보주체는 개인정보침해로 인한 구제를 받기 위하여 개인정보분쟁조정위원회,
                  한국인터넷진흥원 개인정보침해신고센터 등에 분쟁해결이나 상담 등을 신청할 수
                  있습니다. 이 밖에 기타 개인정보침해의 신고, 상담에 대하여는 아래의 기관에
                  문의하시기 바랍니다.
                  <br />
                  <br />
                  1. 개인정보분쟁조정위원회 : (국번없이) 1833-6972 (www.kopico.go.kr)
                  <br />
                  2. 개인정보침해신고센터 : (국번없이) 118 (privacy.kisa.or.kr)
                  <br />
                  3. 대검찰청 : (국번없이) 1301 (www.spo.go.kr)
                  <br />
                  4. 경찰청 : (국번없이) 182 (ecrm.cyber.go.kr)
                  <br />
                  <br />
                  「개인정보보호법」제35조(개인정보의 열람), 제36조(개인정보의 정정·삭제),
                  제37조(개인정보의 처리정지 등)의 규정에 의한 요구에 대 하여 공공기관의 장이 행한
                  처분 또는 부작위로 인하여 권리 또는 이익의 침해를 받은 자는 행정심판법이 정하는
                  바에 따라 행정심판을 청구할 수 있습니다.
                  <br />
                  <br />
                  ※ 행정심판에 대해 자세한 사항은 중앙행정심판위원회(www.simpan.go.kr) 홈페이지를
                  참고하시기 바랍니다.
                  <br />
                  <br />
                  <p className="lh6 bs4">
                    <strong>
                      제18조(영상정보처리기기 운영·관리에 관한 사항)
                      <br />① <em className="emphasis">&lt; 핑크덤벨 &gt;</em>은(는) 아래와 같이
                      영상정보처리기기를 설치·운영하고 있습니다.
                    </strong>
                  </p>
                  <p className="sub_p mgt30">
                    1.영상정보처리기기 설치근거·목적 :{' '}
                    <span className="colorLightBlue">&lt; 핑크덤벨 &gt;</span>의{' '}
                  </p>
                  <ul className="list_indent2 mgt10">
                    <li className="tt">2.설치 대수, 설치 위치, 촬영 범위 :</li>
                    <li>설치대수 : 대</li>
                    <li>설치위치 : </li>
                    <li>촬영범위 : </li>
                  </ul>
                  <p className="sub_p mgt10">
                    3.관리책임자, 담당부서 및 영상정보에 대한 접근권한자 :{' '}
                  </p>
                  <ul className="list_indent2 mgt10">
                    <li className="tt">4.영상정보 촬영시간, 보관기간, 보관장소, 처리방법 </li>
                    <li>촬영시간 : 시간</li>
                    <li>보관기간 : 촬영시부터 </li>
                    <li>보관장소 및 처리방법 : </li>
                  </ul>
                  <p className="sub_p mgt10">5.영상정보 확인 방법 및 장소 : </p>
                  <p className="sub_p mgt10">
                    6.정보주체의 영상정보 열람 등 요구에 대한 조치 : 개인영상정보 열람.존재확인
                    청구서로 신청하여야 하며, 정보주체 자신이 촬영된 경우 또는 명백히 정보주체의
                    생명.신체.재산 이익을 위해 필요한 경우에 한해 열람을 허용함
                  </p>
                  <p className="sub_p mgt10">7.영상정보 보호를 위한 기술적.관리적.물리적 조치 : </p>
                  <br />
                  <br />
                  <p className="lh6 bs4">
                    <strong>
                      제19조(개인정보 처리방침 변경)<em className="emphasis"></em>
                    </strong>
                  </p>
                  <br />
                  <p></p>
                  <p className="sub_p">① 이 개인정보처리방침은 2022년 10월 10부터 적용됩니다.</p>
                  <p className="sub_p"></p>
                  <p></p>
                </em>
              </strong>
            </em>
          </strong>
          <div className="w-full py-4">
            <Button type="button" width="full" label="전체 동의" onClick={onConfirm} />
          </div>
        </div>
      </div>
    </div>
  );
}
