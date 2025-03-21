import Image from "next/image";
import Link from "next/link";

export function UserAvatar() {
  return (
    <Link href="/login" className="w-7 h-7 rounded-full overflow-hidden block">
      <Image src="/avatar.png" alt="User Avatar" width={40} height={40} />
    </Link>
  );
}
