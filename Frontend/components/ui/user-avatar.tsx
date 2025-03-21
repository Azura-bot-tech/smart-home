
import Image from "next/image";

export function UserAvatar() {
  return (
    <div className="w-7 h-7 rounded-full overflow-hidden">
      <Image
        src="/avatar.png"
        alt="User Avatar"
        width={40}
        height={40}
      />
    </div>
  );
}
