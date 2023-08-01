import { Header } from "@/src/components/Header";
import { Pagination } from "@/src/components/Pagination";
import { Sidebar } from "@/src/components/Sidebar";
import {
  Box,
  Button,
  Checkbox,
  Flex,
  Heading,
  Icon,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Text,
  useBreakpointValue,
  Spinner,
} from "@chakra-ui/react";
import Link from "next/link";
import { RiAddLine } from "react-icons/ri";
import { useUsers } from "@/src/services/hooks/useUsers";

type User = {
  id: number;
  name: string;
  email: string;
  createdAt: string;
};

export default function UserList() {
  // Utilizando o useQuery para buscar os dados na API e fazer um CacheLocal para reaproveitar informações.
  const { data, isLoading, isFetching, error } = useUsers();

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  return (
    <Box>
      <Header />

      <Flex w="100%" mt="6" maxWidth={1480} mx="auto" p="6">
        <Sidebar />
        <Box flex="1" borderRadius={8} bg="gray.800" p="8">
          <Flex mb="8" justify="space-between" align="center">
            <Heading size="lg" fontWeight="normal">
              Usuários
              {/* Só mostrar o spinner quando não estiver no primeiro carregamento e estiver na renovação dos dados */}
              {!isLoading && isFetching && (
                <Spinner size="sm" color="gray.500" ml="4" />
              )}
            </Heading>

            <Link href="/users/create" passHref>
              <Button
                size="sm"
                fontSize="sm"
                colorScheme="pink"
                leftIcon={<Icon as={RiAddLine} fontSize="20" />}
              >
                Criar novo
              </Button>
            </Link>
          </Flex>

          {isLoading ? (
            <Flex justify={"center"}>
              <Spinner />
            </Flex>
          ) : error ? (
            <Flex justify="center">Falha ao obter dados dos usuários.</Flex>
          ) : (
            <>
              <Table colorScheme="whiteAlpha">
                <Thead>
                  <Tr>
                    <Th px={["4", "4", "6"]} color="gray.300" width="8">
                      <Checkbox colorScheme="pink" />
                    </Th>
                    <Th>Usuário</Th>

                    {isWideVersion && <Th>Data de cadastro</Th>}
                  </Tr>
                </Thead>
                <Tbody>
                  {data?.map((user: User) => {
                    return (
                      <Tr key={user.id}>
                        <Td px={["4", "4", "6"]}>
                          <Checkbox colorScheme="pink" />
                        </Td>
                        <Td>
                          <Box>
                            <Text fontWeight="bold">{user.name}</Text>
                            <Text fontSize="sm" color="gray.300">
                              {user.email}
                            </Text>
                          </Box>
                        </Td>

                        {isWideVersion && <Td>{user.createdAt}</Td>}
                      </Tr>
                    );
                  })}
                </Tbody>
              </Table>
              <Pagination
                totalCountOfRegisters={200}
                currentPage={5}
                onPageChange={() => {}}
              />
            </>
          )}
        </Box>
      </Flex>
    </Box>
  );
}
