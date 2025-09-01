"use client";

interface Props {
  token: string;
  onUpgraded: () => void;
}

export default function UpgradeButton({ token, onUpgraded }: Props) {
  const handleUpgrade = () => {
    console.log("User token:", token);
    onUpgraded();
  };

  return (
    <button
      onClick={handleUpgrade}
      className="px-6 py-3 rounded-xl bg-purple-500 text-white font-semibold hover:bg-purple-600 transition"
    >
      Upgrade Account
    </button>
  );
}
