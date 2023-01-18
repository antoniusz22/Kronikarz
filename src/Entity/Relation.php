<?php

namespace App\Entity;

use App\Repository\RelationRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: RelationRepository::class)]
class Relation
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column]
    private ?int $parent = null;

    #[ORM\Column]
    private ?int $child = null;

    #[ORM\Column]
    private ?int $relationship_type = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getParent(): ?int
    {
        return $this->parent;
    }

    public function setParent(int $parent): self
    {
        $this->parent = $parent;

        return $this;
    }

    public function getChild(): ?int
    {
        return $this->child;
    }

    public function setChild(int $child): self
    {
        $this->child = $child;

        return $this;
    }

    public function getRelationshipType(): ?int
    {
        return $this->relationship_type;
    }

    public function setRelationshipType(int $relationship_type): self
    {
        $this->relationship_type = $relationship_type;

        return $this;
    }
}
