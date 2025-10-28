export interface Certificate {
  id: string;
  userId: string;
  courseId: string;
  completedAt: string | Date;
  createdAt: string | Date;
  course: {
    id: string;
    title: string;
    slug: string;
    icon?: string;
  };
}

export type CertificateResponse = Certificate[];
