<?php

namespace App\Controller;

use Doctrine\ORM\EntityManagerInterface;
use Doctrine\Persistence\ManagerRegistry;
use JMS\Serializer\SerializerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use App\Entity\User;
use App\Form\UserType;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Security\Core\User\UserInterface;
use Twig\Environment;

class UserController extends AbstractController
{
    public function __construct(
        private readonly ManagerRegistry     $registry,
        private readonly SerializerInterface $serializer
    )
    {
    }

    #[Route('/new-user')]
    public function new(Environment $twig, Request $request, EntityManagerInterface $entityManager, SerializerInterface $serializer, UserInterface $loggedUser): Response
    {
        $user = new User();

        $form = $this->createForm(UserType::class, $user);

        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {

            $user->setAuthId($loggedUser->getId());

            $entityManager->persist($user);
            $entityManager->flush();

            return new JsonResponse([
                'user_id' => $user->getId(),
                'content' => 'User created.'
            ], Response::HTTP_OK);
        }

        return new Response($twig->render('user/show.html.twig', [
            'title' => 'Nowy użytkownik',
            'user_form' => $form->createView()
        ]));
    }

    #[Route('/show-user/{id}', 'show-user', ['id' => '\d+'])]
    public function show(Request $request, User $user): Response
    {
        $response = new Response('', Response::HTTP_OK);

        $em = $this->registry->getManager();
        $form = $this->createForm(UserType::class, $user);

        $reports = $this->serializer->serialize($form->getNormData(), 'json');

        return new Response($reports);
    }

    #[Route('/show-all-user/{id}')]
    public function show_all_user(Request $request): Response
    {
        $em = $this->registry->getManager();

        $entities = $em->getRepository(User::class)->createQueryBuilder('u')
            ->select('u')
            ->getQuery()
            ->getResult();

        $reports = $this->serializer->serialize($entities, 'json');

        return new Response($reports);
    }

    #[Route('/edit-user/{id}/', 'edit-user', ['id' => '\d+'])] // todo: secure the @ParamConverter
    public function edit(Request $request, User $user): Response
    {
        $response = new Response('', Response::HTTP_OK);

        $em = $this->registry->getManager();
        $form = $this->createForm(UserType::class, $user);

        $form->handleRequest($request);

        if ($form->isSubmitted()) {
            if ($form->isValid()) {
                $em->persist($user);
                $em->flush();
                return new JsonResponse([
                    'content' => 'Zaktualizowano dane użytkownika.'
                ]);
            } else {
                $response = new Response('', Response::HTTP_BAD_REQUEST);
            }
        }

        return $this->render('user/show.html.twig', [
            'title' => 'Edycja użytkownika',
            'user_form' => $form->createView()
        ], $response);
    }

    #[Route('/delete-user/{id}', 'delete-user', ['id' => '\d+'])]
    public function delete(int $id): Response
    {
        if (!is_numeric($id)) {
            return new Response('', Response::HTTP_BAD_REQUEST);
        }
        $em = $this->registry->getManager();
        $entity = $em->getRepository(User::class)->findOneBy(['id' => $id]);
        if (!is_null($entity)) {
            $em->remove($entity);
            $em->flush();

            return new Response('', Response::HTTP_OK);
        } else {
            return new Response('', Response::HTTP_BAD_REQUEST);
        }

    }
}