import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import 'dayjs/locale/zh-cn';

const dashboardTz = import.meta.env.DASHBOARD_TZ || 'Asia/Shanghai';

// 言語とタイムゾーン設定
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale('zh-cn');
dayjs.tz.setDefault(dashboardTz);

export default dayjs;
