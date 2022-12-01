<?php

namespace App\Controller;

use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use App\Entity\User;
use App\Form\UserType;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Twig\Environment;

class UserController extends AbstractController
{
   #[Route('/new')]
    public function new(Environment $twig, Request $request, EntityManagerInterface $entityManager): Response
   {
        $user = new User();

        $form = $this->createForm(UserType::class, $user);

        $form->handleRequest($request);

        if($form->isSubmitted() && $form->isValid()) {
            $entityManager->persist($user);
            $entityManager->flush();

            return new Response('User created');
        }

        return new Response($twig->render('user/show.html.twig', [
            'user_form' => $form->createView()
        ]));
    }
}