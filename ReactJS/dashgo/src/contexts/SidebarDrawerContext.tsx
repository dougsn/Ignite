import { UseDisclosureReturn, useDisclosure } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { ReactNode, createContext, useContext, useEffect } from "react";

// Criando contexto para passar o dado de aberto ou fechado para o Sidebar responsivo.

interface SidebarDrawerProvierProps {
  children: ReactNode;
}

type SidebarDrawerContextData = UseDisclosureReturn; // Pegando os dados do sidebar para disponibilizar no contexto.

const SidebarDrawerContext = createContext({} as SidebarDrawerContextData);

export function SidebarDrawerProvider({ children }: SidebarDrawerProvierProps) {
  const disclosure = useDisclosure();
  const router = useRouter();

  useEffect(() => {
    disclosure.onClose();
  }, [router.asPath]) // Toda vez que a URL mudar, a sidebar sera fechada automaticamente.

  return (
    <SidebarDrawerContext.Provider value={disclosure}>
      {children}
    </SidebarDrawerContext.Provider>
  );
}

export const useSidebarDrawer = () => useContext(SidebarDrawerContext);
