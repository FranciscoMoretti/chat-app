import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function AssistantAvatar({
  avatar,
  name,
  className,
}: {
  avatar: string;
  name: string;
  className?: string;
}) {
  return (
    <Avatar className={className}>
      <AvatarImage src={avatar as string} />

      <AvatarFallback>
        {name
          .split(" ")
          .slice(0, 2)
          .reduce((a, b) => a + b[0], "")}
      </AvatarFallback>
    </Avatar>
  );
}
