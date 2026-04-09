export interface Reservation {
  id: string;
  name: string;
  phone: string;
  gender: '남성' | '여성';
  birthDate: string;
  birthTime: string;
  calendarType: '양력' | '음력';
  serviceType: string;
  preferredDate: string;
  preferredTime: string;
  consultMethod: '방문상담' | '전화상담' | '영상상담';
  message: string;
  partnerBirthDate?: string;
  partnerBirthTime?: string;
  partnerCalendarType?: '양력' | '음력';
  createdAt: string;
}

export interface Service {
  icon: string;
  title: string;
  description: string;
  duration: string;
  price: string;
}
