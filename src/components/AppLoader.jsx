import { Loader, Text } from "@mantine/core";
import { BodyWrapper } from "./BodyWrapper";

/** Full-page loader shown while the app restores session on first load */
export function AppLoader() {
  return (
    <BodyWrapper>
      <Loader/>
      <Text size='sm'>Restoring session…</Text>
    </BodyWrapper>
  );
}