'use client';

// التريكة هنا: استدعينا ClipLoader من مساره المباشر مش من المكتبة العامة
import ClipLoader from "react-spinners/ClipLoader";

const override = {
  display: "block",
  margin: "100px auto"
};

// ضفنا parameter الـ loading زي ما المدرب بيعمل بالظبط
const LoadingPage = ({ loading }) => {
  return (
    <ClipLoader
      color='#3b82f6'
      loading={loading}
      cssOverride={override}
      size={150}
      aria-label="Loading Spinner"
    />
  );
};

export default LoadingPage;