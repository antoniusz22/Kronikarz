<?php

namespace App\Controller;

use App\Entity\Relation;
use App\Form\RelationType;
use Doctrine\Persistence\ManagerRegistry;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Twig\Environment;

class RelationController extends AbstractController
{
    public function __construct(
        private readonly ManagerRegistry $registry,
    )
    {
    }

    #[Route('/new-relation')]
    public function new(Environment $twig, Request $request, EntityManagerInterface $entityManager): Response
    {
        $relation = new Relation();

        $form = $this->createForm(RelationType::class, $relation);

        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager->persist($relation);
            $entityManager->flush();

            return new Response('Relation created');
        }

        return new Response($twig->render('relation/index.html.twig', [
            'relation_form' => $form->createView()
        ]));
    }

    #[Route('/edit-relation/{id}/', 'edit-relation', ['id' => '\d+'])] // todo: secure the @ParamConverter
    public function edit(Request $request, Relation $relation): Response
    {
        $response = new Response('', Response::HTTP_OK);

        $em = $this->registry->getManager();
        $form = $this->createForm(RelationType::class, $relation);

        $form->handleRequest($request);

        if ($form->isSubmitted()) {
            if ($form->isValid()) {
                $em->persist($relation);
                $em->flush();
            } else {
                $response = new Response('', Response::HTTP_BAD_REQUEST);
            }
        }

        return $this->render('relation/index.html.twig', [
            'relation_form' => $form->createView()
        ], $response);
    }

    #[Route('/delete-relation/{id}', 'delete-relation', ['id' => '\d+'])]
    public function delete(int $id): Response
    {
        if (!is_numeric($id)) {
            return new Response('', Response::HTTP_BAD_REQUEST);
        }
        $em = $this->registry->getManager();
        $entity = $em->getRepository(Relation::class)->findOneBy(['id' => $id]);
        if (!is_null($entity)) {
            $em->remove($entity);
            $em->flush();

            return new Response('', Response::HTTP_OK);
        } else {
            return new Response('', Response::HTTP_BAD_REQUEST);
        }

    }
}
